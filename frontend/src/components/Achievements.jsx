import React, { useEffect, useState } from 'react';


const Achievements = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          if (progress < 98) {
            setProgress(progress + 1);
          } else {
            clearInterval(interval);
          }
        }, 20);
    
        return () => clearInterval(interval);
      }, [progress]);
  return (
    <div>
      <section>
          {/* +++++++++++++++++++++++Achievements+++++++++++++++ */}
          <h1>Achievements</h1>
          {/* <div className="w-full h-[30vh] border-2 border-green-200 grid sm:grid-cols-2 md:grid-cols-5 justify-center items-center">
            <div className="w-60 h-full bg-red-100 border-2 border-green-200 m-auto"></div>
            <div className="w-60 h-full bg-red-100 border-2 border-green-200 m-auto"></div>
            <div className="w-60 h-full bg-red-100 border-2 border-green-200 m-auto"></div>
            <div className="w-60 h-full bg-red-100 border-2 border-green-200 m-auto"></div>
            <div className="w-60 h-full bg-red-100 border-2 border-green-200 m-auto"></div>
          </div> */}
          <div className="container mx-auto p-4">
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
    <div className=" p-4 text-center col-span-2 flex flex-col items-center justify-center">
    <div className="relative w-full sm:w-32 h-full sm:h-32 ">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ">
                    {progress}%
                  </span>
                </div>
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-red-500"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: "251.2, 251.2",
                      strokeDashoffset: `${251.2 - (251.2 * progress) / 100}`,
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
              <p>A remarkable 98% hatch rate for healthy chicks.</p>
    </div>
    <div className="p-4 text-center col-span-2 flex flex-col items-center justify-center">
    <div className="relative w-full sm:w-32 h-full sm:h-32 ">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ">
                    {progress}%
                  </span>
                </div>
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-red-500"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: "251.2, 251.2",
                      strokeDashoffset: `${251.2 - (251.2 * progress) / 100}`,
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
              <p>Pioneering a waste-reduction program, reusing 80% of coop materials.</p>
    </div>
    <div className="p-4 text-center col-span-2 flex flex-col items-center justify-center">
    <div className="relative w-full sm:w-32 h-full sm:h-32 ">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ">
                    {progress}%
                  </span>
                </div>
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-red-500"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: "251.2, 251.2",
                      strokeDashoffset: `${251.2 - (251.2 * progress) / 100}`,
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
              <p>A remarkable 98% hatch rate for healthy chicks.</p>
    </div>
    <div className="p-4 text-center col-span-2 flex flex-col items-center justify-center">
    <div className="relative w-full sm:w-32 h-full sm:h-32 ">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ">
                    {progress}%
                  </span>
                </div>
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-red-500"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: "251.2, 251.2",
                      strokeDashoffset: `${251.2 - (251.2 * progress) / 100}`,
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
              <p>A remarkable 98% hatch rate for healthy chicks.</p>
    </div>
    <div className="p-4 text-center col-span-2 flex flex-col items-center justify-center">
    <div className="relative w-full sm:w-32 h-full sm:h-32 ">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ">
                    {progress}%
                  </span>
                </div>
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-red-500"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: "251.2, 251.2",
                      strokeDashoffset: `${251.2 - (251.2 * progress) / 100}`,
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
              <p>A remarkable 98% hatch rate for healthy chicks.</p>
    </div>
    <div className="p-4 text-center col-span-2 flex flex-col items-center justify-center">
    <div className="relative w-full sm:w-32 h-full sm:h-32 ">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ">
                    {progress}%
                  </span>
                </div>
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-red-500"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: "251.2, 251.2",
                      strokeDashoffset: `${251.2 - (251.2 * progress) / 100}`,
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
              <p>A remarkable 98% hatch rate for healthy chicks.</p>
    </div>
  </div>
</div>
          {/* <div className="">
            <div className="">
              <div className="relative w-full sm:w-32 h-full sm:h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                    {progress}%
                  </span>
                </div>
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-red-500"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: "251.2, 251.2",
                      strokeDashoffset: `${251.2 - (251.2 * progress) / 100}`,
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
              <p>A remarkable 98% hatch rate for healthy chicks.</p>
            </div>
          </div> */}
          {/* <p>Additionally, please highlight our notable achievements:

A remarkable 98% hatch rate for healthy chicks.
Award-winning chickens producing jumbo-sized, double-yolked eggs.
Pioneering a waste-reduction program, reusing 80% of coop materials.
Educating over 1,000 children about sustainable poultry farming through school workshops.
Receiving a perfect 5-star rating for customer satisfaction for two consecutive years.</p> */}
        </section>
    </div>
  )
}

export default Achievements
