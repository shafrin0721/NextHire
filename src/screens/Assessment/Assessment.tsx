import { HeaderSection } from "../Home/sections/HeaderSection";
import { FooterSection } from "../Home/sections/FooterSection";

const questionOptions = [
  "Using this.setState() method",
  "Using useState hook with setter function",
  "Directly modifying state variables",
  "Using forceUpdate() method",
];

export const Assessment = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <HeaderSection />

      <main className="flex-1 bg-white">
        <section className="border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-[1120px] py-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-xl md:text-2xl tracking-[-0.50px] leading-7 md:leading-8">
                  Frontend Developer Assessment
                </h1>
                <p className="[font-family:'Inter',Helvetica] text-sm text-gray-500 leading-5">
                  React &amp; JavaScript Skills Test
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2">
                  <span className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                    Time Remaining
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-semibold text-blue-700 text-sm">
                    25:26
                  </span>
                </div>
                <button className="rounded-lg border border-gray-200 px-4 py-2 text-xs md:text-sm [font-family:'Inter',Helvetica] text-gray-700 hover:bg-gray-50">
                  Instructions
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 [font-family:'Inter',Helvetica]">
              <span>Progress</span>
              <span>Question 3 of 15</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full w-1/5 rounded-full bg-blue-500" />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-8 md:py-10">
          <div className="container mx-auto px-4 max-w-[1120px] flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-[0px_12px_32px_rgba(15,23,42,0.12)] border border-gray-100 p-6 md:p-8 flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                <div className="flex gap-3">
                  <span className="font-medium text-blue-600">Question 3</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 self-center" />
                  <span>Multiple Choice</span>
                </div>
              </div>

              <div>
                <h2 className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-base md:text-lg leading-6 md:leading-7">
                  What is the correct way to handle state updates in React functional
                  components?
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {questionOptions.map((option, index) => {
                  const letter = String.fromCharCode(65 + index);
                  const isSelected = letter === "B";

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm md:text-base [font-family:'Inter',Helvetica] ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 text-blue-800"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {letter}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs md:text-sm [font-family:'Inter',Helvetica] text-gray-700 hover:bg-gray-50">
                    &lt; Previous
                  </button>
                </div>
                <div className="flex gap-3">
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs md:text-sm [font-family:'Inter',Helvetica] text-gray-700 hover:bg-gray-50">
                    Mark for Review
                  </button>
                  <button className="rounded-lg bg-blue-600 px-5 py-2 text-xs md:text-sm [font-family:'Inter',Helvetica] font-medium text-white hover:bg-blue-700">
                    Next &gt;
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-[0px_10px_28px_rgba(15,23,42,0.10)] border border-gray-100 p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm md:text-base">
                  Question Overview
                </h3>
                <div className="flex flex-wrap gap-3 text-[11px] md:text-xs [font-family:'Inter',Helvetica] text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="h-4 w-4 rounded bg-emerald-100 border border-emerald-400" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-4 w-4 rounded bg-blue-600" />
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-4 w-4 rounded bg-amber-100 border border-amber-400" />
                    <span>Marked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-4 w-4 rounded bg-gray-100 border border-gray-200" />
                    <span>Not Visited</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-8 gap-2 max-w-[520px]">
                {Array.from({ length: 15 }, (_, index) => {
                  const number = index + 1;
                  let classes =
                    "flex h-8 w-8 items-center justify-center rounded text-xs [font-family:'Inter',Helvetica] border";

                  if (number === 3) {
                    classes += " bg-blue-600 text-white border-blue-600"; // current
                  } else if ([1, 2, 7].includes(number)) {
                    classes +=
                      " bg-emerald-100 text-emerald-700 border-emerald-400"; // answered
                  } else if (number === 6) {
                    classes += " bg-amber-100 text-amber-700 border-amber-400"; // marked
                  } else {
                    classes += " bg-gray-100 text-gray-600 border-gray-200"; // not visited
                  }

                  return (
                    <div key={number} className={classes}>
                      {number}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

