import React, { forwardRef, useState } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import useEffectExceptMpunt from "../src";
import { act } from "react-dom/test-utils";

interface Props {
    fn: () => void;
}

const container = document.createElement("div");
beforeEach(() => {
    // setup a DOM element as a render target
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
});

describe("Effect set to run on mount", () => {
    const Component: React.FC<Props> = ({ fn }) => {
        useEffectExceptMpunt(fn, []);
        return null;
    };
    it("Does not run the effect on mount", () => {
        const fn = jest.fn();

        act(() => {
            render(<Component fn={fn} />, container);
        });

        expect(fn).not.toHaveBeenCalled();
    });
});

describe("Effect set to run on dependency change", () => {
    const Component = forwardRef<HTMLButtonElement, Props>(({ fn }, ref) => {
        const [count, setCount] = useState(0);
        useEffectExceptMpunt(fn, [count]);
        return (
            <button ref={ref} onClick={() => setCount((c) => c + 1)}></button>
        );
    });
    it("Does not run the effect on mount but runs on dependency change", () => {
        const retFn = jest.fn();
        const fn = jest.fn(() => retFn);
        const ref = React.createRef<HTMLButtonElement>();
        act(() => {
            render(<Component fn={fn} ref={ref} />, container);
        });

        // Effect not run on mount
        expect(fn).not.toHaveBeenCalled();
        // Dependency change trigerred
        act(() => ref.current.click());
        // Effect runs for the first time
        expect(fn).toHaveBeenCalledTimes(1);
        expect(retFn).not.toHaveBeenCalled();
        // Second dependency change triggered
        act(() => ref.current.click());
        // Cleanup from previous call expected to run
        expect(fn).toHaveBeenCalledTimes(2);
        expect(retFn).toHaveBeenCalledTimes(1);
        // At unmount
        act(() => {
            unmountComponentAtNode(container);
        });
        expect(fn).toHaveBeenCalledTimes(2);
        expect(retFn).toHaveBeenCalledTimes(2);
    });
});
