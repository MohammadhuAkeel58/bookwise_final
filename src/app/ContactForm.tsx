"use client";

import { useEffect, useState } from "react";
import css from "styled-jsx/css";
import { useRegion } from "./RegionProvider";

/* ============================================================
 *  ContactForm — submits to FormSubmit (formsubmit.co).
 *
 *  No account, no API key. Every submission is emailed straight
 *  to CONTACT_EMAIL. The FIRST submission triggers a one-time
 *  "Activate Form" email to that address — click the link once
 *  and all future submissions are delivered. Honeypot (_honey)
 *  for spam. Host-independent (works anywhere).
 * ============================================================ */

const CONTACT_EMAIL = "amharaslam7620@gmail.com";
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export default function ContactForm() {
  const { region } = useRegion();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    region: "uk",
    message: "",
    _honey: "",
  });

  // Default the region select to the visitor's chosen market.
  useEffect(() => {
    if (region) setForm((f) => ({ ...f, region }));
  }, [region]);

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New enquiry from ${form.name || "the website"} — comaccpar.com`,
          _template: "table",
          _captcha: "false",
          _honey: form._honey,
          name: form.name,
          email: form.email,
          company: form.company,
          region: form.region === "au" ? "Australia" : "United Kingdom",
          message: form.message,
        }),
      });
      const data = await res.json();
      if (String(data.success) !== "true") {
        throw new Error(data.message || "failed");
      }
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="cform cform--done" role="status">
        <span className="cform-tick" aria-hidden="true">
          ✓
        </span>
        <h3 className="cform-done-title">Message sent</h3>
        <p className="cform-done-text">
          Thanks — we&apos;ve got it. Expect a reply within one working day.
        </p>
        <style jsx>{doneStyles}</style>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      {/* Honeypot — bots fill this, humans never see it */}
      <p className="cform-hp" aria-hidden="true">
        <label>
          Don&apos;t fill this out if you&apos;re human:{" "}
          <input
            name="_honey"
            value={form._honey}
            onChange={set("_honey")}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </p>

      <div className="cform-row">
        <label className="cform-field">
          <span className="cform-label">Full name</span>
          <input
            name="name"
            value={form.name}
            onChange={set("name")}
            required
            autoComplete="name"
            placeholder="Jordan Ellis"
          />
        </label>
        <label className="cform-field">
          <span className="cform-label">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={set("email")}
            required
            autoComplete="email"
            placeholder="jordan@company.com"
          />
        </label>
      </div>

      <div className="cform-row">
        <label className="cform-field">
          <span className="cform-label">Company</span>
          <input
            name="company"
            value={form.company}
            onChange={set("company")}
            autoComplete="organization"
            placeholder="Company Ltd"
          />
        </label>
        <label className="cform-field">
          <span className="cform-label">Region</span>
          <select name="region" value={form.region} onChange={set("region")}>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
          </select>
        </label>
      </div>

      <label className="cform-field">
        <span className="cform-label">How can we help?</span>
        <textarea
          name="message"
          value={form.message}
          onChange={set("message")}
          required
          rows={5}
          placeholder="Tell us a little about your business and what you need…"
        />
      </label>

      {status === "error" && (
        <p className="cform-err" role="alert">
          Something went wrong sending that. Please try again, or email{" "}
          <a href="mailto:hello@comaccpar.com">hello@comaccpar.com</a>.
        </p>
      )}

      <button
        type="submit"
        className="cform-submit"
        disabled={status === "sending"}
      >
        <span>{status === "sending" ? "Sending…" : "Send message"}</span>
        <span aria-hidden="true">→</span>
      </button>
      <p className="cform-note">
        We&apos;ll never share your details. Reply within one working day.
      </p>

      <style jsx>{formStyles}</style>
    </form>
  );
}

const formStyles = css`
  .cform {
    background: #ffffff;
    border: 1px solid rgba(3, 0, 46, 0.08);
    border-radius: 16px;
    padding: clamp(1.5rem, 3vw, 2.1rem);
    box-shadow: 0 40px 90px -40px rgba(1, 8, 34, 0.8);
  }
  .cform-hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .cform-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9rem;
    margin-bottom: 0.9rem;
  }
  @media (max-width: 560px) {
    .cform-row {
      grid-template-columns: 1fr;
    }
  }
  .cform-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 0.9rem;
  }
  .cform-row .cform-field {
    margin-bottom: 0;
  }
  .cform-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .cform :global(input),
  .cform :global(select),
  .cform :global(textarea) {
    width: 100%;
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--ink);
    background: #f4f2ec;
    border: 1.5px solid rgba(3, 0, 46, 0.22);
    border-radius: 10px;
    padding: 0.78rem 0.9rem;
    transition:
      border-color 160ms ease,
      background 160ms ease,
      box-shadow 160ms ease;
  }
  .cform :global(select) {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2303002e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
    background-repeat: no-repeat;
    background-position: right 0.85rem center;
    padding-right: 2.4rem;
  }
  .cform :global(textarea) {
    resize: vertical;
    min-height: 6.5rem;
  }
  .cform :global(input:hover),
  .cform :global(select:hover),
  .cform :global(textarea:hover) {
    border-color: rgba(3, 0, 46, 0.4);
  }
  .cform :global(input:focus),
  .cform :global(select:focus),
  .cform :global(textarea:focus) {
    outline: none;
    background: #ffffff;
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.15);
  }
  .cform :global(input::placeholder),
  .cform :global(textarea::placeholder) {
    color: rgba(3, 0, 46, 0.45);
  }
  .cform-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    margin-top: 1.2rem;
    padding: 0.95rem 1.4rem;
    border: 0;
    border-radius: 999px;
    background: var(--red);
    color: #ffffff;
    font-family: var(--font-placard);
    font-size: 1.05rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition:
      transform 180ms ease,
      background 180ms ease;
  }
  .cform-submit:hover {
    background: var(--red-deep);
  }
  .cform-submit:active {
    transform: scale(0.98);
  }
  .cform-submit:disabled {
    opacity: 0.7;
    cursor: default;
  }
  .cform-note {
    margin: 0.8rem 0 0;
    text-align: center;
    font-size: 0.72rem;
    color: rgba(3, 0, 46, 0.5);
  }
  .cform-err {
    margin: 0.4rem 0 0;
    font-size: 0.82rem;
    color: var(--red-deep);
  }
  .cform-err :global(a) {
    color: var(--red-deep);
    text-decoration: underline;
  }
`;

const doneStyles = css`
  .cform--done {
    background: rgba(246, 244, 238, 0.98);
    border: 1px solid rgba(3, 0, 46, 0.08);
    border-radius: 16px;
    padding: clamp(2.4rem, 5vw, 3.4rem) 2rem;
    text-align: center;
    box-shadow: 0 40px 90px -40px rgba(1, 8, 34, 0.75);
  }
  .cform-tick {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 999px;
    background: var(--ink);
    color: #b99328;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .cform-done-title {
    margin: 0 0 0.5rem;
    font-family: var(--font-placard);
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: var(--ink);
  }
  .cform-done-text {
    margin: 0;
    font-size: 0.95rem;
    color: rgba(3, 0, 46, 0.65);
  }
`;
