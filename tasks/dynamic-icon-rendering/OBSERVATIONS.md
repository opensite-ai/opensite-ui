# Dynamic Icon Rendering Refactor Observations

No out-of-scope issues or approval-requiring ambiguities have been observed.

Record unrelated defects, possible abstractions, and other non-spec work here
without modifying them.

## 2026-07-30 Pilot Process Note

A focused-test subprocess briefly wrote its captured output to a repo-root
`tmp.*` file. The scope guard caught it immediately, its creating agent
confirmed provenance, and it was removed before the pilot gate. No source,
dependency, generated, or committed scope drift resulted, and later commands
were run without repo-local temporary files.
