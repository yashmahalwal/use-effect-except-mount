import React, { useEffect, useRef } from "react";
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
        addMessage("useEffect hook called for count:  " + count);
        setUseEffectCount((e) => e + 1);

        return () =>
            addMessage("Cleanup called for useEffect for count: " + count);
    }, [count]);

    useEffectExceptMount(() => {
        addMessage("useEffectExceptMount hook called for count:  " + count);
        setUseEffectExceptMount((e) => e + 1);

        return () =>
            addMessage(
                "Cleanup called for useEffectExceptMount for count: " + count
            );
    }, [count]);
    return (
        <>
            <h2>Component Mounted</h2>
            <p>
                <code>useEffect</code> has been called: {useEffectCount} times
                while
                <code>useEffectExceptMount</code> has been called{" "}
                {useEffectExceptMountCount} times.
            </p>
        </>
    );
};

const Wrapper: React.FC = () => {
    const [messages, setMessages] = React.useState<string[]>([]);
    const [mount, setMount] = React.useState(false);
    const [stateTrigger, setStateTrigger] = React.useState(0);
    const ref = useRef<HTMLOListElement>(null);
    useEffectExceptMount(() => {
        if (!ref.current) return;
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [messages]);

    return (
        <section
            style={{
                padding: 20,
                maxWidth: 900,
                margin: "auto",
            }}>
            <h1
                style={{
                    fontSize: "1.5rem",
                    textAlign: "center",
                    marginBottom: "3rem",
                }}>
                useEffect Except Mount: Demo
            </h1>
            <p>
                For this demo, we have a component that uses both{" "}
                <code>useEffect</code> and <code>useEffectExceptMount</code>{" "}
                hooks. Their dependency is a prop named <b>count</b>. Below is
                how to understand this demo:
            </p>
            <code>Count: {stateTrigger}</code>
            <dl style={{ margin: "20px 0" }}>
                <dt>Toggle mount / unmount</dt>
                <dd>
                    <button onClick={() => setMount((m) => !m)}>
                        {mount ? "Unmount" : "Mount"} Component
                    </button>
                    <br />
                    This button will mount/unmount the component.
                </dd>
                <dt>Fire Effect</dt>
                <dd>
                    <button
                        onClick={() => {
                            if (mount) setStateTrigger((s) => s + 1);
                            else
                                setMessages((m) => [
                                    ...m,
                                    "Component is not mounted",
                                ]);
                        }}>
                        Fire effect
                    </button>
                    <br />
                    This button will increment the <code>count</code> prop of
                    the component.
                </dd>
                <dt>Clear Log</dt>
                <dd>
                    <button onClick={() => setMessages([])}>Clear log</button>
                    <br />
                    This button will clear the log.
                </dd>
                <dt>Reset count prop</dt>
                <dd>
                    <button onClick={() => setStateTrigger(0)}>
                        Reset count
                    </button>
                    <br />
                    This button will set <code>count</code> to 0.
                </dd>
            </dl>
            {mount && (
                <Component
                    addMessage={(m) => setMessages((ms) => [...ms, m])}
                    count={stateTrigger}
                />
            )}
            <ol
                ref={ref}
                style={{
                    margin: "20px 0",
                    background: "#ececec",
                    height: 300,
                    overflowY: "scroll",
                    fontFamily: "monospace",
                    paddingTop: 10,
                    paddingBottom: 10,
                }}>
                {messages.map((e, i) => (
                    <li key={i}>{e}</li>
                ))}
            </ol>
        </section>
    );
};

render(<Wrapper />, document.getElementById("root"));
