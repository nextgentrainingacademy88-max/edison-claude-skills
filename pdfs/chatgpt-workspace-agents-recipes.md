# 5 ChatGPT Workspace Agent Recipes

**For solo founders and SME operators who want to delegate, not hire.**

Brought to you by **AI with Edison**. Edison Chua, AI Marketing Strategist.

OpenAI launched Workspace Agents in ChatGPT on **April 22, 2026**. Powered by Codex,
they run in the cloud, keep working when you log off, and are shareable across your team.
Free until **May 6, 2026** for Business, Enterprise, Edu, and Teachers plans.

This guide gives you the exact setup for the 5 agents I would build first as a one-person
business. Each one replaces a hire you cannot afford yet.

---

## 1. Lead-Qualifier Agent

**What it replaces:** A junior SDR or virtual assistant.

**What it does:** Reads every new lead in your inbox or CRM. Scores them hot, warm, or cold
based on a rubric you define. Drafts a first-touch reply in your voice. You approve, hit send.

**Setup prompt (paste into the agent builder):**

```
You are my lead-qualifier agent. When a new lead enters my inbox or CRM, you do three things:

1. Read the message and any LinkedIn or company info I attach.
2. Score the lead Hot, Warm, or Cold using this rubric:
   Hot = budget mentioned, deadline mentioned, decision-maker, fits my ICP.
   Warm = fits my ICP, no budget yet, exploring options.
   Cold = wrong fit, vendor pitch, recruiter, or job seeker.
3. Draft a reply in my voice (warm, direct, no fluff, no em dashes). Cap at 80 words.
   For Hot leads, suggest 2 specific times for a 20-min discovery call this week.
   For Warm leads, send a useful resource and ask one qualifying question.
   For Cold leads, send a polite no.

Always end the draft with: "Edison Chua | AI with Edison".
Wait for me to approve before sending.
```

**Time saved:** 6-10 hours a week if you get more than 20 leads a week.

---

## 2. Weekly Content Agent

**What it replaces:** A part-time social media manager.

**What it does:** Every Monday morning, pulls the top 5 stories in your niche from the past
7 days. Drafts 5 ready-to-post pieces of content in your voice across the platforms you choose.

**Setup prompt:**

```
You are my weekly content agent. Every Monday at 7am, do this:

1. Search the web for the top 5 most-discussed stories from the last 7 days in:
   AI tools (Claude, ChatGPT, NotebookLM, Manus, Gemini, Perplexity, Sora, Veo).
2. For each story, draft one post in this format:
   - Hook (one bold line)
   - 3 to 5 numbered insights or implications
   - Soft CTA at the end
   - No em dashes, no jargon, no hashtags except 3 at the bottom
3. Keep each post under 220 words. Match my voice: confident, direct, practical.
4. Output all 5 posts in a single message, labelled Post 1 to Post 5, ready to copy.

I will pick which one to publish each day. Ask me which platform before drafting if unclear.
```

**Time saved:** 6 hours of staring at a blank screen every week.

---

## 3. Invoice Chaser Agent

**What it replaces:** Your monthly admin "I should chase those invoices" guilt.

**What it does:** Tracks every unpaid invoice. Drafts a polite follow-up at day 7, day 14,
and day 30. You forward. Most clients pay within 48 hours.

**Setup prompt:**

```
You are my invoice chaser agent. I will share a CSV or screenshot of unpaid invoices once a week.

For each unpaid invoice, do this:
1. Note the days overdue.
2. Draft a polite follow-up email matching the overdue stage:
   - Day 7: friendly nudge, assume they missed it. 60 words max.
   - Day 14: warmer reminder, attach the invoice again, offer a quick call.
   - Day 30: firm but polite, mention late fee policy if I have one.
3. Sign off as "Edison Chua | AI with Edison".

Output one email per overdue invoice. No em dashes. Wait for my approval before "sending".
```

**Money saved:** Most solos collect 23 days faster on chased invoices vs unchased.

---

## 4. Support Triage Agent

**What it replaces:** A part-time customer success person.

**What it does:** Sorts your support inbox by urgency. Drafts replies to the easy 70%. You only
touch the tough 30%.

**Setup prompt:**

```
You are my support triage agent. When I forward a batch of support tickets or DMs, do this:

1. Sort each one into:
   - URGENT (refund, broken access, angry customer) - flag for me to handle.
   - EASY (how-do-I, where-is-my-receipt, can-you-resend) - draft a reply.
   - SPAM (bot, irrelevant, vendor pitch) - mark to delete.
2. For EASY tickets, draft a warm one-paragraph reply with the answer.
   Sign off as "Edison from AI with Edison".
   No em dashes. Friendly, not robotic.
3. Output a clean list: ticket headline, category, draft reply (if easy).

I approve in bulk. Send when I say go.
```

**Time saved:** Cuts your daily support load by half.

---

## 5. Competitor Watch Agent

**What it replaces:** A junior researcher.

**What it does:** Scans 5 competitor websites every Friday. Summarises any pricing change,
new feature, fresh offer, or new headline. Lands in your inbox before lunch.

**Setup prompt:**

```
You are my competitor watch agent. My competitor list is:
[List 5 competitor URLs here]

Every Friday at 10am, do this:
1. Visit each competitor's homepage and pricing page.
2. Compare against last week's snapshot you have stored.
3. Summarise in one short brief per competitor:
   - Pricing changes (yes/no, what changed)
   - New features or product launches
   - New headline or value prop
   - New testimonials or case studies
4. End with one paragraph: "Strategic implications for AI with Edison".

Keep the whole brief under 600 words. No em dashes. Bullet lists are fine.
```

**Hours saved:** 4-6 hours of manual research a month.

---

## Setup Tips (Read Before You Build)

1. **Workspace agents are free until May 6, 2026** for Business, Enterprise, Edu, and
   Teachers plans on ChatGPT. After that, credit-based pricing kicks in. Build your
   library of agents now, test them in the free window, then keep the ones that earn
   their keep.

2. **Share inside your team.** The whole point of workspace agents is they are not
   trapped in your account. One person builds the lead-qualifier agent, the whole team
   uses it. Build once, scale across the org.

3. **Treat the prompt as a living document.** Refine it weekly based on what the agent
   gets wrong. The agent improves the more you correct it.

4. **Always start in approval mode.** Have the agent draft, you approve. Once you trust
   it after 20-30 cycles, switch to auto-send for the easy categories.

5. **Edison's rule: no em dashes anywhere.** Add it to every system prompt. Trust me.

---

**Want more recipes like these?**

Follow Edison Chua across LinkedIn, Facebook, Instagram, Threads, and X (`@aiwithedison`).

Skill library + prompts: https://github.com/nextgentrainingacademy88-max/edison-claude-skills

Comment **AGENT** under any post and I will DM you the full guide.

Edison Chua | AI Marketing Strategist | HRDC-certified AI Trainer
