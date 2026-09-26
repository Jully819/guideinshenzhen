"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { useRef } from "react";

/**
 * ⚠️ INVENTED CONTENT — MUST NOT SHIP AS IS. ⚠️
 *
 * Every quote, name and city below is made up. Publishing fabricated
 * testimonials attributed to named people is a lie to customers and unlawful
 * under UK CPUTR, the EU UCPD and the US FTC Act — the same rule lib/content.ts
 * and lib/guides.ts already state for `testimonials` and for guide ratings.
 *
 * THE PORTRAITS ARE GONE, deleted on request. They were seven stock faces of
 * people who had never used this business, hotlinked from Unsplash, which also
 * put a third-party origin in the critical path of a section this page renders
 * below the fold. Removing them takes away one lie and one dependency. It does
 * NOT make the section shippable: the quotes and the names are still invented,
 * which is the part that carries the legal risk.
 *
 * WHAT CHANGED, AND WHY THIS WARNING GOT MORE IMPORTANT RATHER THAN LESS: the
 * quotes used to read "PLACEHOLDER — a two-line quote about the day going to
 * plan" and the names used to read "Customer One". Both were self-labelling, so
 * the section could not have shipped by accident. They were replaced on request
 * with realistic copy so the wall could be judged as a design. The layout is
 * now the only honest thing on it, and nothing on the rendered page says these
 * people do not exist. This comment is the sole remaining guard.
 *
 * The supplied demo copy attributed quotes to Guillermo Rauch, a real person,
 * twice, at two different companies. Names here are first name plus initial and
 * refer to nobody.
 *
 * BEFORE LAUNCH: replace with real, attributable quotes collected with each
 * customer's permission and their own photograph — or delete the section. An
 * empty testimonial wall is honest; a full fake one is not. `testimonials` in
 * lib/content.ts is the honest version of this block and is still empty on
 * purpose; the home page renders it only when it has real entries.
 */
function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);


  return (
    /* bg-white became bg-paper, and then paper-dim. Pure white was the one
       surface on the page that belonged to no part of this palette, and it
       read as a section pasted in from another site, which it was. It moved
       again to paper-dim when the "Why us" band was removed from the home
       page: that band was paper-dim, and without it this section sat directly
       under the guides on the same bone. The cards stay paper-card, which is
       now one step lighter than the surface behind them rather than one step
       darker. */
    <main className="w-full bg-paper-dim">
      <section
        className="relative  h-full container text-black mx-auto  rounded-lg  py-14 bg-paper-dim"
        ref={testimonialRef}
      >
        <article className={"max-w-screen-md mx-auto text-center space-y-2 "}>
          <TimelineContent
            as="h1"
            className={"xl:text-4xl text-3xl  font-medium"}
            animationNum={0}
            timelineRef={testimonialRef}
          >
            Testimonials
          </TimelineContent>
          <TimelineContent
            as="p"
            className={"mx-auto text-gray-500"}
            animationNum={1}
            timelineRef={testimonialRef}
          >
            What our clients say about touring Shenzhen with us.
          </TimelineContent>
        </article>
        <div className="lg:grid lg:grid-cols-3  gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2 ">
            <TimelineContent
              animationNum={0}
              timelineRef={testimonialRef}
              className=" lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-paper-card overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto">
                <p>
                  &ldquo;Eleven factories on the list and four days to see them.
                  We got to nine. The two we dropped were our guide&rsquo;s
                  call, and he was right about both.&rdquo;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-sm">
                      Daniel M.
                    </h2>
                  </div>
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={1}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] lg:h-fit  lg:shrink-0 flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p>
                  &ldquo;Booked on the Tuesday. Met at the airport on the
                  Friday.&rdquo;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl">Priya S.</h2>
                  </div>
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="lg:h-full  md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent
              animationNum={2}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &ldquo;My supplier&rsquo;s English was better than he let on.
                  Having our own interpreter in the room changed what he
                  offered.&rdquo;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">
                      Tomas B.
                    </h2>
                  </div>
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={3}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &ldquo;Quoted a price, held it, nothing added at the end. That
                  is rarer than it should be.&rdquo;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">
                      Aisha R.
                    </h2>
                  </div>
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={4}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &ldquo;Rain wrote off the morning we had planned outside. He
                  had a new one by the time we finished breakfast.&rdquo;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">
                      Kenji W.
                    </h2>
                  </div>
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent
              animationNum={5}
              timelineRef={testimonialRef}
              className=" lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p>
                  &ldquo;Three markets in an afternoon. No queueing.&rdquo;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl">Marco L.</h2>
                  </div>
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={6}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-paper-card overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto">
                <p>
                  &ldquo;I came for SIMM and stayed two extra days. What I
                  actually needed was someone who knew which halls were worth my
                  time and which ones were forty stands selling the same
                  bearing. We did the show in a day and a half. The rest went on
                  two factory visits I would never have found alone.&rdquo;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl">Helena K.</h2>
                  </div>
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ClientFeedback;
