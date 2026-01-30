import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks({ skills = [] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={skill.path} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.slice().reverse().map((skill, index) => (
          <Icon key={index} src={skill.path} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
