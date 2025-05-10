
import { Link } from "lucide-react";
import React from "react";

const About = () => {
    return (
        <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">About Pollution Reporter</h1>
                <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
                    EnvReporter is a platform dedicated to empowering individuals and organizations
                    to take action in protecting the environment. Our mission is to bridge the gap
                    between environmental issues and solutions by providing a reliable reporting system,
                    educational resources, and collaborative tools.
                </p>

                {/* Our Vision */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Vision</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We envision a world where every person is informed, engaged, and equipped
                        to make positive environmental changes. From grassroots activists to global NGOs,
                        we strive to connect change-makers and provide a platform where their efforts are
                        visible and impactful.
                    </p>
                </section>

                {/* What We Do */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">What We Do</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Allow users to report environmental violations, pollution, and illegal activities.</li>
                        <li>Enable NGOs to respond, manage, and document actions taken.</li>
                        <li>Provide a central dashboard for real-time monitoring and alerts.</li>
                        <li>Promote awareness through educational blogs, newsletters, and campaigns.</li>
                        <li>Foster community involvement with events and local collaborations.</li>
                    </ul>
                </section>

                {/* Our Impact */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Impact</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Since our inception, we've helped track and resolve hundreds of environmental
                        complaints across regions. Through the involvement of citizens and NGOs, we’ve
                        built a growing network committed to a cleaner and more sustainable future.
                    </p>
                </section>

                {/* Join Us */}
                <section className="text-center">
                  <h2 className="text-2xl font-semibold text-green-600 mb-4">Join the Movement</h2>
                  <p className="text-gray-700 mb-6">
                    Whether you’re a concerned citizen, a volunteer, or an NGO representative,
                    EnvReporter welcomes your voice. Together, we can make a real difference.
                  </p>
                  <a
                    href="/register"
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
                  >
                    Sign Up Today
                  </a>
                </section>
                {/* Join Us */}
                {/* <section className="text-center"> */}
                {/*     <h2 className="text-2xl font-semibold text-green-600 mb-4">Join the Movement</h2> */}
                {/*     <p className="text-gray-700 mb-6"> */}
                {/*         Whether you’re a concerned citizen, a volunteer, or an NGO representative, */}
                {/*         EnvReporter welcomes your voice. Together, we can make a real difference. */}
                {/*     </p> */}
                {/*     <Link */}
                {/*         to="/register" */}
                {/*         className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition" */}
                {/*     > */}
                {/*         Sign Up Today */}
                {/*     </Link> */}
                {/* </section> */}
            </div>
        </div>
    );
};

export default About;
