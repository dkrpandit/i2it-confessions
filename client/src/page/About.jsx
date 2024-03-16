import React from 'react';

const About = () => {
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to I2IT Confessions</h1>
            <p className="mb-4">
                This platform is exclusively designed for students of I2IT.
                It was the brainchild of my friend Siddhesh Kumbhar, and I'm grateful to him for this wonderful idea.
            </p>
            <p className="mb-4">
                Our aim with this website is to provide a space where I2IT students can anonymously share their thoughts
                and experiences without any fear. Your privacy is our utmost priority. Rest assured, the developers do not
                have access to any information regarding the identity of the users posting confessions.
            </p>
            <p className="mb-4">
                The reason we ask for your email during registration is to ensure that only legitimate I2IT students
                have access to the platform. We use it solely for verification purposes.
            </p>
            <p className="mb-4">
                We kindly request users not to spam the platform with unnecessary messages. Let's maintain the integrity
                of this space for genuine confessions.
            </p>
            <p className="mb-4">
                If you have any suggestions or feedback to improve our platform, please feel free to reach out to me
                at  <a href="mailto:dharmendra763297@gmail.com" style={{ color: "#1e46d5" }}>dharmendra763297@gmail.com</a>
                Your inputs are valuable to us!
            </p>
        </div>
    );
}

export default About;
