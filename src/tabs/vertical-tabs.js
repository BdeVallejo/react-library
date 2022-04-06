import React, {useState, useEffect} from "react";
import './css/vertical-tabs.css'
import { differentTexts } from "../utils/text-placeholder";

const VerticalTabs = () => {
    const [ loading, setLoading ] = useState(true);
    const [ texts, setTexts ] = useState([]);
    const [ value, setValue ] = useState(0);

    const fetchText = async () => { 
        //this function can be customized with a fetch call from an API or similar
        setTexts(differentTexts);
        setLoading(false);
    }
    
    useEffect(() => {
        fetchText();
    }, []);

    if(loading) {
        return <section className="section loading"><h3>loading...</h3></section>
    }

    const { id, title , text } = texts[value];

    return(<div>
        <div className="title">
            <h2>Vertical Tabs</h2>
        </div>
        <section className="tab-section">
           
            
            <div className="tab-content">

                <div className="btn-container">
                    {texts.map((item, index) => {
                        return <button key={item.id}
                        onClick={() => { setValue(index) }}
                        className={`tab-btn ${index === id && 'active-btn'}`}
                        >
                            {item.title}
                        </button>
                    })}
                </div>

                 <article className="tab-content-text">
                     <h3>{title}</h3>
                     <h4>{text}</h4>
                 </article>

            </div>


        </section>
        </div>
    )
}

export default VerticalTabs;