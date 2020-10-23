import React, { useEffect } from "react";
import { render } from "react-dom";
import useEffectExceptMount from "../src/index";
const Component: React.FC<{
    count: number;
    addMessage: (a: string) => void;
}> = ({ count, addMessage }) => {
    const [useEffectExceptMountCount, setUseEffectExceptMount] = React.useState(
        0
    );
    const [useEffectCount, setUseEffectCount] = React.useState(0);

    useEffect(() => {
        addMessage("UseEffect hook called : effect call number " + count);
        setUseEffectCount((e) => e + 1);

        return () =>
            addMessage(
                "Cleanup called for useEffect for effect call number: " + count
            );
    }, [count]);

    useEffectExceptMount(() => {
        addMessage(
            "UseEffectExceptMount hook called : effect call number " + count
        );
        setUseEffectExceptMount((e) => e + 1);

        return () =>
            addMessage(
                "Cleanup called for UseEffectExceptMount for effect call number: " +
                    count
            );
    }, [count]);
    return (
        <>
            <h2>Component Mounted</h2>
            <p>
                Use effect has been called: {useEffectCount} times while
                useEffectExceptMount has been called {useEffectExceptMountCount}{" "}
                times.
            </p>
        </>
    );
};

const Wrapper: React.FC = () => {
    const [messages, setMessages] = React.useState<string[]>([]);
    const [mount, setMount] = React.useState(false);
    const [stateTrigger, setStateTrigger] = React.useState(0);
    return (
        <>
            <h1>UseEffectExceptMount: Example</h1>
            <p>
                We have made a component with both useEffect and
                useEffectExceptMount hooks. Click on the button to call the
                effect. You have trigerred the effect {stateTrigger} times.
            </p>
            {mount && (
                <Component
                    addMessage={(m) => setMessages((ms) => [...ms, m])}
                    count={stateTrigger}
                />
            )}
            <br />
            <br />
            <button onClick={() => setMount((m) => !m)}>
                {mount ? "Unmount" : "Mount"} Component
            </button>
            <br />
            <br />
            <button onClick={() => setMessages([])}>Clear log</button>
            <br />
            <br />
            <button
                onClick={() => {
                    if (mount) setStateTrigger((s) => s + 1);
                    else setMessages((m) => [...m, "Component is not mounted"]);
                }}>
                Fire effect
            </button>
            <h3>log</h3>
            <ol>
                {messages.map((e, i) => (
                    <li key={i}>{e}</li>
                ))}
            </ol>
        </>
    );
};

render(<Wrapper />, document.getElementById("root"));
