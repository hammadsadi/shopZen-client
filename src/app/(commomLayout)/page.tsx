"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div className="bg-white">
      <Button>Click Me</Button>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae alias
      consectetur ratione exercitationem dicta nostrum accusamus repudiandae quo
      officiis amet temporibus, voluptatum labore beatae quisquam tenetur,
      distinctio dolorum nemo quibusdam recusandae, sapiente cum nulla. Commodi
      repudiandae soluta exercitationem consequatur consectetur.
    </div>
  );
};

export default HomePage;
