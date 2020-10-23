import React from "react";

export default function useEffectExceptMount(
    ...args: Parameters<typeof React.useEffect>
): ReturnType<typeof React.useEffect> {
    const isRunningOnMount = React.useRef(true);

    React.useEffect(() => {
        if (isRunningOnMount.current) isRunningOnMount.current = false;
        else return args[0]();
    }, args[1]);
}
