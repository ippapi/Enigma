"use client";

import Scene from "@/components/threejs/threeModelViewer";
import TarotCard from "@/components/threejs/flipCard";

export default function Home() {
    return (
        <div>
            <Scene />
            <TarotCard frontImage={"./front.jpg"} backImage={"./back.jpg"}/>
        </div>
    );
}
