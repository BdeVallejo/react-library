import React, { useState, useEffect } from 'react';
import './css/slider.css';
import { differentTexts } from '../utils/text-placeholder';

const Slider = () => {
    const [ loading, setLoading ] = useState(true);
    const [ texts, setTexts ] = useState(differentTexts);
    const [ index, setIndex ] = useState(0);
  
    
    const fetchText = async () => { 
        //this function can be customized with a fetch call from an API or similar
        setTexts(differentTexts);
        setLoading(false);
    }
    
    useEffect(() => {
        fetchText();
    }, []);

    
    //to display last item if negative
    //to reset index to 0 if last item
    useEffect(() => {
      const lastIndex = texts.length - 1;
        if(index < 0) {
          setIndex(lastIndex)
        }
        if(index > lastIndex){
          setIndex(0);
        }
      }, [index, texts]);
  
    useEffect(() => {
      //we do this so that we can celar the interval
      let slider = setInterval(() => {
        setIndex(index + 1)
      },3000);
      return () => clearInterval(slider)
    }, [index]);

    if(loading) {
        return <section className="section loading"><h3>loading...</h3></section>
    }
  
    return (<div>

        <div className="title">
            <h2>Slider</h2>
        </div>

        <section className="section">

            <div className="section-center">
                {texts.map((t, textIndex) => {
                const { id, title, image, text } = t;
                let position = "nextSlide";
                if(textIndex === index) {
                    position = "activeSlide";
                }
                //lastSlide is the last active slide 
                //or the last slide if the current slide is the first one
                if(textIndex === index - 1 || ( index === 0 && textIndex === text.length - 1)) {
                    position = "lastSlide"
                }
                return (
                    <article key={id} className={position}>
                    <img src={image} alt={title} className="person-img" />
                    <h4>{title}</h4>
                    <p className="text">{text}</p>
                    </article>
                );
                })}
                <button className="prev" onClick={() => setIndex(index - 1)}>
                    Previous
                </button>
                <button className="next" onClick={() => setIndex(index + 1)}>
                    Next
                </button>
            </div>
            </section>
        </div>
    );
}

export default Slider;