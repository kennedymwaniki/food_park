// import NavBar from "../components/NavBar";
import about from "../assets/images/about_chef.jpg";

const About = () => {
  return (
    <div className="flex justify-between mx-auto gap-6">
      <div className="flex gap-4 max-sm:flex-col">
        <div className="m-4 space-x-4">
          <img src={about} alt="" className="h-[300px] w-[900px] rounded-xl" />
        </div>
        <div className="p-4 space-y-2">
          <h4 className="text-orange-500 font-serif font-semibold text-lg italic">
            About Company
          </h4>
          <h2 className="text-xl font-extrabold">Healathy Foods Provider</h2>
          <div className="py-3 gap-8 space-y-2">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate aspernatur molestiae minima pariatur consequatur
              voluptate sapiente deleniti soluta, animi ab necessitatibus optio
              similique quasi fuga impedit corrupti obcaecati neque consequatur
              sequi.
            </p>
            <ul className="grid grid-cols-2 p-1">
              <li>Delicious & Healthy Foods </li>
              <li>Spacific Family & Kids Zone</li>
              <li>Best Price & Offers</li>
              <li>Made By Fresh Ingredients</li>
              <li>Music & Other Facilities</li>
              <li>Delicious & Healthy Foods </li>
              <li>Spacific Family & Kids Zone</li>
              <li>Best Price & Offers</li>
              <li>Made By Fresh Ingredients</li>
              <li>Delicious & Healthy Foods </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
