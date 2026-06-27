"""Sanity check for calling Claude through Google Vertex AI.

Run this once after `pip install -r requirements.txt` and `gcloud auth
application-default login` to confirm the project, region, and model are wired
up. It sends one tiny message and prints the reply.

Usage:
    GCP_PROJECT_ID=your-project GCP_REGION=global python check_vertex.py
"""

import os

from anthropic import AnthropicVertex

# region can be "global" (recommended), a multi-region ("us"/"eu"), or a
# specific region like "us-east5". Auth is Google ADC, no Anthropic API key.
PROJECT_ID = os.environ.get("GCP_PROJECT_ID")
REGION = os.environ.get("GCP_REGION", "global")

# Vertex model IDs take no prefix. Current-generation models use the bare
# first-party id; dated snapshots use an @ separator (e.g. claude-haiku-4-5@20251001).
MODEL = os.environ.get("CLAUDE_MODEL", "claude-opus-4-8")


def main() -> None:
    if not PROJECT_ID:
        raise SystemExit("Set GCP_PROJECT_ID (your Google Cloud project id) first.")

    client = AnthropicVertex(project_id=PROJECT_ID, region=REGION)

    message = client.messages.create(
        model=MODEL,
        max_tokens=64,
        messages=[{"role": "user", "content": "Reply with just: Vertex is working."}],
    )

    for block in message.content:
        if block.type == "text":
            print(block.text)


if __name__ == "__main__":
    main()
