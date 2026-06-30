/**
 * leads-apps-script.gs — lead capture endpoint for the earnings calculator.
 *
 * Deploy this as a Google Apps Script Web App (Deploy ▸ New deployment ▸
 * Web app ▸ Execute as: Me ▸ Who has access: Anyone). Copy the /exec URL into
 * LEAD_ENDPOINT in assets/calculator.js. Full steps in automation/SETUP.md.
 *
 * On each submission it:
 *   1. Appends the lead (with a hot/warm/cold score) to a Google Sheet.
 *   2. Emails YOU a notification via Gmail, with the triage on the subject line.
 *   3. Emails the LEAD an instant auto-reply with their breakdown + playbook link.
 */

// ── CONFIG ──────────────────────────────────────────────────────────────────
var OWNER_EMAIL   = 'itstonijo@live.com.au';      // where lead alerts go
var SHEET_NAME    = 'Leads';                        // tab name in the bound Sheet
var FROM_NAME     = 'QEH / 2026';                   // display name on auto-replies
var PLAYBOOK_URL  = 'https://itstonijo.github.io/qeh-2026/'; // swap for your PDF link
var BOOK_CALL_URL = 'https://www.xrecruiter.io/strategy-call';

// ── Web App entry point ──────────────────────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return json_({ ok: false, error: 'invalid email' });
    }

    var triage = scoreLead_(data);     // { tag, score, reason }
    saveToSheet_(data, triage);
    notifyOwner_(data, triage);
    autoReply_(data);

    return json_({ ok: true, tag: triage.tag });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Lets you open the /exec URL in a browser to confirm it's live.
function doGet() {
  return json_({ ok: true, service: 'qeh-leads', status: 'live' });
}

// ── Lead triage (rule-based, the seed of the AI agent) ───────────────────────
// Scores intent from the numbers the recruiter entered. A real LLM agent can
// later replace/augment these rules — the tag column stays the same.
function scoreLead_(d) {
  var billings = Number(d.annual_billings) || 0;
  var placements = Number(d.placements_per_month) || 0;
  var score = 0;
  var reasons = [];

  if (billings >= 600000) { score += 3; reasons.push('high billings'); }
  else if (billings >= 300000) { score += 2; reasons.push('solid billings'); }
  else if (billings >= 120000) { score += 1; reasons.push('moderate billings'); }

  if (placements >= 4) { score += 2; reasons.push('high deal flow'); }
  else if (placements >= 2) { score += 1; reasons.push('steady deal flow'); }

  var tag = score >= 4 ? 'HOT' : score >= 2 ? 'WARM' : 'COLD';
  return { tag: tag, score: score, reason: reasons.join(', ') || 'low signal' };
}

// ── Persistence ──────────────────────────────────────────────────────────────
function saveToSheet_(d, triage) {
  var sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Submitted', 'Tag', 'Score', 'Reason', 'Name', 'Email',
      'Avg fee', 'Placements/mo', 'Current rate %',
      'Annual billings', 'Employee take-home', 'Agency take-home',
      'Extra/year', 'Source', 'UTM', 'Nurture step', 'Page'
    ]);
  }
  sheet.appendRow([
    d.submitted_at || new Date().toISOString(),
    triage.tag, triage.score, triage.reason,
    d.name || '', d.email,
    d.avg_placement_fee || '', d.placements_per_month || '',
    d.current_take_home_rate_pct || '',
    d.annual_billings || '', d.employee_take_home || '', d.agency_take_home || '',
    d.extra_per_year || '', d.source || '',
    d.utm ? JSON.stringify(d.utm) : '',
    0,                       // nurture step — email-flows.gs advances this
    d.page || ''
  ]);
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

// ── Notifications ────────────────────────────────────────────────────────────
function notifyOwner_(d, triage) {
  var subject = '[' + triage.tag + '] New lead: ' + (d.name || d.email) +
    ' — extra/yr ' + money_(d.extra_per_year);
  var body =
    triage.tag + ' lead (score ' + triage.score + ': ' + triage.reason + ')\n\n' +
    'Name: ' + (d.name || '') + '\n' +
    'Email: ' + d.email + '\n\n' +
    'Avg fee: ' + money_(d.avg_placement_fee) + '\n' +
    'Placements/mo: ' + (d.placements_per_month || '') + '\n' +
    'Current rate: ' + (d.current_take_home_rate_pct || '') + '%\n' +
    'Annual billings: ' + money_(d.annual_billings) + '\n' +
    'Extra/year on their own desk: ' + money_(d.extra_per_year) + '\n\n' +
    'Source: ' + (d.source || '') + '  ' + (d.utm ? JSON.stringify(d.utm) : '');
  MailApp.sendEmail({ to: OWNER_EMAIL, subject: subject, body: body });
}

function autoReply_(d) {
  var first = (d.name || 'there').split(' ')[0];
  var subject = first + ', here\'s what your own desk could pay you';
  var body =
    'Hi ' + first + ',\n\n' +
    'Here\'s the breakdown from the calculator, on your numbers:\n\n' +
    '  • Annual billings:        ' + money_(d.annual_billings) + '\n' +
    '  • As an employee today:   ' + money_(d.employee_take_home) + '\n' +
    '  • Your own agency (90%):  ' + money_(d.agency_take_home) + '\n' +
    '  • Extra in your pocket:   ' + money_(d.extra_per_year) + ' / year\n\n' +
    'That gap is the whole reason we built the agency-in-a-box model: you keep\n' +
    '90% of your billings while we handle the tech, brand, back office and\n' +
    'compliance.\n\n' +
    'Grab the 90-Day Launch Playbook here: ' + PLAYBOOK_URL + '\n\n' +
    'When you want to pressure-test these numbers with us, book a free 30-min\n' +
    'strategy call: ' + BOOK_CALL_URL + '\n\n' +
    '— The ' + FROM_NAME + ' team';
  MailApp.sendEmail({ to: d.email, subject: subject, body: body, name: FROM_NAME });
}

// ── helpers ──────────────────────────────────────────────────────────────────
function money_(n) {
  n = Number(n) || 0;
  return '$' + Math.round(n).toLocaleString('en-US');
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
