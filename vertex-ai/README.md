# Claude on Vertex AI

Setup for calling Claude (Anthropic) through Google Cloud Vertex AI, so the
automations can run on our own GCP project instead of a separate Anthropic key.

## 1. Install

```bash
pip install -U google-cloud-aiplatform "anthropic[vertex]"
```

Or from this folder:

```bash
pip install -r vertex-ai/requirements.txt
```

> On Debian-based machines the install can stop with
> `Cannot uninstall packaging ... RECORD file not found`. That's the system
> Python fighting pip. Add `--ignore-installed packaging`, or use a virtualenv:
> `python -m venv .venv && source .venv/bin/activate` then install.

## 2. Authenticate

Vertex uses Google Application Default Credentials, not an Anthropic API key.

```bash
gcloud auth application-default login
```

For a server or automation, use a service account instead and point
`GOOGLE_APPLICATION_CREDENTIALS` at its key file.

The account needs the **Vertex AI User** role, and the Claude models have to be
enabled in Vertex AI Model Garden for the project.

## 3. Settings

| Variable | What it is | Example |
| --- | --- | --- |
| `GCP_PROJECT_ID` | Google Cloud project id | `ironside-prod` |
| `GCP_REGION` | `global` (recommended), `us`/`eu`, or a region | `global` |
| `CLAUDE_MODEL` | Vertex model id (no prefix) | `claude-opus-4-8` |

Model ids on Vertex take **no prefix**. Current models use the bare id
(`claude-opus-4-8`, `claude-sonnet-4-6`); dated snapshots use an `@` separator
(e.g. `claude-haiku-4-5@20251001`).

## 4. Check it works

```bash
GCP_PROJECT_ID=your-project GCP_REGION=global python vertex-ai/check_vertex.py
```

A successful run prints `Vertex is working.`

## Minimal usage

```python
from anthropic import AnthropicVertex

client = AnthropicVertex(project_id="your-project", region="global")

message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
)
print(message.content[0].text)
```

After construction the client has the same `messages.create` / `.stream`
surface as the normal Anthropic SDK.

## Notes / limits on Vertex

- No Anthropic API key is used; auth is entirely Google ADC.
- A few first-party features aren't available on Vertex (e.g. the Files API,
  message batches, web fetch). Web search is limited to the basic variant.
