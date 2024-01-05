import { useState, useEffect, type FC } from "react";

const Test: React.FC = () => {
    const [result, setResult] = useState("");

    useEffect(() => {
        async function test() {
            setResult("12345");
        }
        test();
    }, []);

    return (
        <div>
            Result: {result}
        </div>
    );
};

export default Test;
