import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  /* optional submit handler */
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add real email / API logic
    alert("Thanks! We’ll get back to you shortly.");
  };

  return (
    <section
      id="contact"
      className="
        w-full
        px-6 lg:px-12
        pt-20 lg:pt-14
        pb-10 bg-gray-100 
      "
    >
      {/* 2-column on ≥1024px, stacked below */}
      <div className="grid lg:grid-cols-2 gap-y-16 gap-x-14 max-w-8xl mx-auto">
        {/* ── Left column ── */}
        <div>
          <h2 className="text-[10vw] lg:text-[72px] leading-none font-extrabold mb-6">
            GET&nbsp;IN&nbsp;TOUCH
          </h2>

          <p className="text-[7vw] lg:text-5xl leading-tight font-medium mb-8">
            Need a creative team in your corner? We’ve got you.&nbsp;
            <Link
              to="#contact"
              className="underline underline-offset-4 decoration-2 hover:text-gibbouspurple transition"
            >
              Send us a message
            </Link>{" "}
            or schedule a time to connect.
          </p>

          <a
            href="https://calendly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              border-2 border-orange-500 text-orange-600
              px-10 py-4 tracking-widest text-sm font-semibold
              hover:bg-orange-500 hover:text-white
              transition
            "
          >
            BOOK CALENDLY
          </a>
        </div>

        {/* ── Right column: form ── */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-8 w-full"
        >
          <label className="flex flex-col space-y-2">
            <span className="uppercase text-sm tracking-wide">Name</span>
            <input
              type="text"
              placeholder="Please enter your name"
              required
              className="
                h-12 w-full border border-gray-900
                px-4 text-base outline-none
                focus:ring-2 focus:ring-gibbouspurple transition
              "
            />
          </label>

          <label className="flex flex-col space-y-2">
            <span className="uppercase text-sm tracking-wide">
              Email Address
            </span>
            <input
              type="email"
              placeholder="Provide email address"
              required
              className="
                h-12 w-full border border-gray-900
                px-4 text-base outline-none
                focus:ring-2 focus:ring-gibbouspurple transition
              "
            />
          </label>

          <label className="flex flex-col space-y-2">
            <span className="uppercase text-sm tracking-wide">Message</span>
            <textarea
              placeholder="Tell us about your project….."
              required
              className="
                min-h-[160px] w-full border border-gray-900
                p-4 text-base outline-none resize-y
                focus:ring-2 focus:ring-gibbouspurple transition
              "
            />
          </label>

          <button
            type="submit"
            className="
              self-start lg:self-end
              bg-black text-white px-10 py-4 tracking-widest text-sm font-semibold
              hover:bg-gibbouspurple transition
            "
          >
            SUBMIT MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
}
