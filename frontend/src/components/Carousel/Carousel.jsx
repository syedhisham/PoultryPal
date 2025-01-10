import { Carousel } from "@material-tailwind/react";

const Carousels = () => {
  return (
    <div className="w-full xs:h-[10vh] sm:h-[20vh] md:h-[30vh] xl:h-[50vh] mx-auto">
      <Carousel
        className="rounded-xl"
        autoplay={true}
        loop={true}
        autoplayDelay={3000}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          src="https://img.freepik.com/free-photo/photorealistic-scene-poultry-farm-with-chickens_23-2151500736.jpg?t=st=1730047557~exp=1730051157~hmac=a561daf83ee28b4a46f46e5e4d00095e700bb1fb67c035b779f6e6db1793e019&w=1380"
          alt="image 1"
          className="h-full w-full object-cover"
          sizes={10}
        />
        <img
          src="https://img.freepik.com/free-photo/photorealistic-scene-poultry-farm-with-chickens_23-2151500790.jpg?t=st=1730047599~exp=1730051199~hmac=885ef083f02dee50212388078642ebc928007d8140b80030a702f48cbabeeb06&w=1380"
          alt="image 2"
          className="h-full w-full object-cover"
          sizes={10}
        />
        <img
          src="https://img.freepik.com/free-photo/photorealistic-scene-poultry-farm-with-chickens_23-2151500756.jpg?t=st=1730047654~exp=1730051254~hmac=087a265112005ce16f00335c1a8687527d188c331521aac3ab0974456e7eecdf&w=1380"
          alt="image 3"
          className="h-full w-full object-cover"
          sizes={10}
        />
        <img
          src="https://images.pexels.com/photos/10691027/pexels-photo-10691027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="image 4"
          className="h-full w-full object-cover"
          sizes={10}
        />
        <img
          src="https://images.pexels.com/photos/12995533/pexels-photo-12995533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="image 5"
          className="h-full w-full object-cover"
          sizes={10}
        />
        <img
          src="https://images.pexels.com/photos/27083552/pexels-photo-27083552/free-photo-of-flock-of-chickens.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="image 6"
          className="h-full w-full object-cover"
          sizes={10}
        />
      </Carousel>
    </div>
  );
};

export default Carousels;
