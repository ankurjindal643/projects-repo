1. mediaStream -> ye ek mediaRecorder object deta hai jisse hum audio and video record kar skte hai

2. mediaRecorder -> ye record jo krta hai CHUNKS me krta hai (size depend krta hai) browser / RAM / OS

3. dataavailabe and stop are the events

4. chunks parts me splited hote hai and then hume unhe combine krna hota hai ek single video me


===============ANIMATION.HTML FILE CONTENT ====================
div{

    background-color: yellow;
    /* yhaa animation ka name dalna hai   animationName -> shrinkDownUp*/
    animation: shrinkDownUp;
    /* animation ki duration ki kitni daer tak animation chlege */
    animation-duration: 2s;
    /* ye loop ki trah h usse bar bar play karta rhega */
    /* animation-iteration-count: infinite; */
    /* ye jo shape vo lelega usee change nahi karega */
    animation-fill-mode: forwards;
    /* ye jab page reload hoga to given time lega play krne mai animation-delay:2s;
}



------------- KEY FRAMES ----------
@keyframes shrinkDownUp {
    0% {  -> JAB ANIMATION START NAHI HUI HAI TAB YE VALA KAM HOGA

        SCALE PROPERTY WILL INCREASE THE SIZE OF THE OBJECT 
        transform: scale(1);

        BORDER READIUS WILL ROEUND-UP THE BORDER OF THE SHAPE AS PER GIVEN PERCENT
        border-radius: 0;
    }

    
    50% {   -> JAB ANIMATION AADHI KATHAM HO CHUKI HAI TB YE VALA AKM HOGA
        transform: scale(2);
        border-radius: 50%;

        
        background-color: red;
    }
    100% {   -> OR JAB ENDING YANI FUL KATHM HO CHUKI HAI TAB YE VALA KAM HOGA.
        transform: scale(1);
        border-radius: 0%;
    }
}