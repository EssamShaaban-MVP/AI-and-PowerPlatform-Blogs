---
title: "Connecting AI agents to Power Apps without exposing credentials"
description: "A reference pattern for identity-aware integration between Power Apps, managed APIs, and enterprise AI agents."
date: 2026-11-18
category: "Agentic AI"
tags: ["Power Apps", "Microsoft Foundry", "Security"]
readingMinutes: 7
---

> **Reference architecture, not a validated production deployment.** This article describes an approach to evaluate; authorization and service support must be verified in your environment.

A useful agent isn't useful for long if its integration model puts secrets in the client. When a low-code application calls an enterprise agent, the hardest part is often **identity propagation**, not the model itself.

## The question to start with

Who is the caller, what are they authorized to do, and how does every tool enforce that authorization? A user-facing Power Apps interface cannot be trusted to keep a shared API key or bearer token secret.

## A safer reference pattern

```text
Power Apps (signed-in user)
       |
       v
Managed API / trusted orchestration layer
       |  authenticate + authorize
       v
Agent runtime (Microsoft Foundry / Copilot Studio)
       |
       v
Approved enterprise tools + data sources
```

Your intermediary should validate identity, scope access, and use an appropriately managed identity or OAuth connection for downstream tools. The design must make an explicit choice between **delegated user authorization** and **application permissions**; these are not interchangeable.

## Checklist before production

1. Remove hard-coded secrets and shared service tokens from client-side code.
2. Validate authenticated identity and enforce authorization on the server.
3. Scope every tool to the minimum required permissions.
4. Use audit records and correlation IDs without logging sensitive prompt content unnecessarily.
5. Test cross-user isolation, token expiry, connection failures, and prompt injection against tools.

## A note on implementation

A Logic Apps workflow, Power Automate flow, custom API, or other managed boundary may be suitable depending on the available connectors and identity support. **A workflow URL alone does not make an API secure.** Verify your exact plan and connector capabilities before selecting an implementation.

Further reading: [Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/) and [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/).
