import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import {
  Container,
  Wrapper,
  Arrow,
  Slide,
  ImgContainer,
  Image,
  InfoContainer,
  Title,
  Description,
  Button,
} from "./styles";
import { sliderItems } from "../../data";
import { useEffect } from "react";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const handleClick = (newIndex) => {
    if (newIndex < 0) {
      newIndex = sliderItems.length - 1;
    } else if (newIndex >= sliderItems.length) {
      newIndex = 0;
    }
    setSlideIndex(newIndex);
  };

  useEffect(() => {
    setTimeout(()=>{
      setPaused(false)
    })
    const interval = setInterval(() => {
      if(!paused){
        handleClick(slideIndex + 1);
      }
    }, 4000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <Container>
      <Arrow
        direction="left"
        onClick={() => {
          handleClick(slideIndex - 1);
          setPaused(true);
        }}
      >
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item, key) => (
          <Slide content={item.content} key={key}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              {item.shouldRenderButton && <Button>SHOP NOW</Button>}
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow
        direction="right"
        onClick={() => {
          handleClick(slideIndex + 1);
          setPaused(true);
        }}
      >
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
