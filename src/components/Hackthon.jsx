import { Trophy, Zap, Target, Users, Lightbulb, Rocket } from "lucide-react";

export default function HackathonExperience() {
  const experiences = [
    {
      title: "SRMCEM Roborace",
      position: "1st Position",
      icon: <Trophy className="w-6 h-6" />,
      description: "Achieved perfect harmony between speed and precision in autonomous bot development. This victory taught me that excellence comes from meticulous attention to detail and relentless optimization.",
      skills: ["Speed Optimization", "Precision Control", "Autonomous Systems"],
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200"
    },
    {
      title: "Cozmoclench IIT Bombay",
      position: "2nd Position",
      icon: <Rocket className="w-6 h-6" />,
      description: "Competing at IIT Bombay elevated my robotics engineering mindset. I discovered the power of systematic design thinking and robust control mechanisms under pressure.",
      skills: ["Robotics Design", "Control Systems", "Engineering Mindset"],
      gradient: "from-blue-400 to-purple-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      borderColor: "border-blue-200"
    },
    {
      title: "WebX Hackathon GLA",
      position: "2nd Position",
      icon: <Zap className="w-6 h-6" />,
      description: "Crafted a cyberpunk-themed esports UI that pushed creative boundaries. This experience showed me how technical skills and artistic vision can create truly immersive digital experiences.",
      skills: ["UI/UX Design", "Frontend Development", "Creative Problem Solving"],
      gradient: "from-purple-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Technoxian Roborace",
      position: "4th Rank",
      icon: <Users className="w-6 h-6" />,
      description: "My first major robotics competition became a masterclass in collaboration. I learned that great teams adapt quickly, make decisive choices, and turn challenges into stepping stones.",
      skills: ["Teamwork", "Adaptability", "Quick Decision Making"],
      gradient: "from-green-400 to-teal-500",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Competition Journey</h2>
        <p className="text-xl text-gray-600 mb-6">
          Every competition is a lesson, every challenge a chance to grow
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`${exp.bgColor} ${exp.borderColor} border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <div className={`w-full h-full bg-gradient-to-br ${exp.gradient} rounded-full transform translate-x-16 -translate-y-16`}></div>
            </div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-r ${exp.gradient} rounded-xl text-white shadow-lg`}>
                  {exp.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${exp.gradient} text-white px-3 py-1 rounded-full text-sm font-semibold mt-1`}>
                    <Target className="w-4 h-4" />
                    {exp.position}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
              "{exp.description}"
            </p>

            <div className="flex flex-wrap gap-2 relative z-10">
              {exp.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="bg-white bg-opacity-80 text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8 text-yellow-400" />
          <h3 className="text-2xl font-bold text-white">Growth Mindset</h3>
        </div>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Each competition has shaped me into a more versatile engineer. From robotics precision to creative UI design, 
          from individual excellence to team synergy – I've learned that true growth happens at the intersection of 
          challenge and curiosity.
        </p>
        <div className="flex items-center justify-center gap-8 mt-6 text-yellow-400">
          <div className="text-center">
            <div className="text-2xl font-bold">4+</div>
            <div className="text-sm text-gray-400">Competitions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-400">Podium Finishes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">∞</div>
            <div className="text-sm text-gray-400">Lessons Learned</div>
          </div>
        </div>
      </div>
    </div>
  );
}