/**
 * email-flows.gs — automated nurture sequence for calculator leads.
 *
 * Add this to the SAME Apps Script project as leads-apps-script.gs (it shares
 * the Leads sheet). Then run setupNurtureTrigger() ONCE to schedule it to run
 * every day. Each day it looks at every lead, works out which nurture email is
 * due based on days since they signed up, sends it, and records progress in the
 * "Nurture step" column so nobody gets the same email twice.
 *
 * Sequence (days are from signup):
 *   Step 1  → day 0  (instant breakdown is handled by leads-apps-script.gs)
 *   Step 2  → day 2
 *   Step 3  → day 4
 *   Step 4  → day 7
 *   Step 5  → day 11
 */

var SHEET_NAME_NURTURE = 'Leads';
var FROM_NAME_NURTURE  = 'QEH / 2026';
var BOOK_CALL_URL_N    = 'https://www.xrecruiter.io/strategy-call';

// Each step: how many days after signup it should go out, plus subject/body.
// {{first}} and {{extra}} are filled per lead.
var SEQUENCE = [
  {
    afterDays: 2,
    subject: 'The part of going independent nobody warns you about',
    body:
      'Hi {{first}},\n\n' +
      'Most recruiters who think about going out on their own get stuck on the\n' +
      'same thing: the admin. Invoicing, debt collection, payroll, contracts,\n' +
      'compliance. It quietly eats the time you should be spending billing.\n\n' +
      'That\'s exactly the part we take off your plate. You bring the desk; we\n' +
      'run the back office. You stay focused on closing deals.\n\n' +
      'Reply and tell me your biggest worry about going independent — I read\n' +
      'every one.\n\n— The ' + FROM_NAME_NURTURE + ' team'
  },
  {
    afterDays: 4,
    subject: '{{first}}, how operators hit $50k/mo inside 90 days',
    body:
      'Hi {{first}},\n\n' +
      'A quick look at how the 90-day launch actually works:\n\n' +
      '  Days 1–30:  brand, website and tech stack live; compliance set up\n' +
      '  Days 31–60: pipeline built, first roles out, back office running\n' +
      '  Days 61–90: placements landing — most operators target ~$50k/mo run-rate\n\n' +
      'And the whole time, you keep billing. No income gap. That extra\n' +
      '{{extra}}/year the calculator showed you? This is the path to it.\n\n' +
      '— The ' + FROM_NAME_NURTURE + ' team'
  },
  {
    afterDays: 7,
    subject: 'You don\'t have to do this alone',
    body:
      'Hi {{first}},\n\n' +
      'Going independent doesn\'t mean going it alone. Every operator gets\n' +
      'weekly masterminds, 1:1 coaching, and a community of agency owners who\n' +
      'have already walked the path — so you skip the expensive mistakes.\n\n' +
      'It\'s the difference between starting from scratch and starting from a\n' +
      'proven playbook.\n\n— The ' + FROM_NAME_NURTURE + ' team'
  },
  {
    afterDays: 11,
    subject: '{{first}}, ready to pressure-test your numbers?',
    body:
      'Hi {{first}},\n\n' +
      'You ran the numbers — roughly {{extra}}/year more on your own desk.\n\n' +
      'The next step is a free, no-pressure 30-minute strategy call. We\'ll\n' +
      'stress-test your niche, your numbers and your runway, and you\'ll leave\n' +
      'with the real gaps in your plan and the next steps to launch.\n\n' +
      'Book whenever suits you: ' + BOOK_CALL_URL_N + '\n\n' +
      '— The ' + FROM_NAME_NURTURE + ' team'
  }
];

// Column indexes (1-based) — must match the header row in leads-apps-script.gs.
var COL_SUBMITTED = 1;
var COL_NAME      = 5;
var COL_EMAIL     = 6;
var COL_EXTRA     = 13;
var COL_STEP      = 16;

/** Run ONCE to schedule the daily send. */
function setupNurtureTrigger() {
  // clear any duplicates first
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'runNurture') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('runNurture').timeBased().everyDays(1).atHour(9).create();
}

/** Fired daily by the trigger. */
function runNurture() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_NURTURE);
  if (!sheet || sheet.getLastRow() < 2) return;

  var rows = sheet.getDataRange().getValues();
  var now = new Date();

  for (var r = 1; r < rows.length; r++) {       // skip header
    var row = rows[r];
    var email = row[COL_EMAIL - 1];
    if (!email) continue;

    var stepDone = Number(row[COL_STEP - 1]) || 0;
    if (stepDone >= SEQUENCE.length) continue;    // finished the sequence

    var submitted = new Date(row[COL_SUBMITTED - 1]);
    var daysSince = (now - submitted) / 86400000;

    var next = SEQUENCE[stepDone];                // the step we'd send next
    if (daysSince < next.afterDays) continue;     // not due yet

    var first = String(row[COL_NAME - 1] || 'there').split(' ')[0];
    var extra = money_n_(row[COL_EXTRA - 1]);

    MailApp.sendEmail({
      to: email,
      name: FROM_NAME_NURTURE,
      subject: fill_(next.subject, first, extra),
      body: fill_(next.body, first, extra)
    });

    sheet.getRange(r + 1, COL_STEP).setValue(stepDone + 1);
  }
}

function fill_(s, first, extra) {
  return s.replace(/\{\{first\}\}/g, first).replace(/\{\{extra\}\}/g, extra);
}

function money_n_(n) {
  n = Number(n) || 0;
  return '$' + Math.round(n).toLocaleString('en-US');
}
