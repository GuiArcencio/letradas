import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Game() {
    const router = useRouter();
    const [correctWord, setCorrectWord] = useState("");

    useEffect(() => {
        try {
            if (router.query.code) {
                const code = Buffer.from(router.query.code, "hex");
                const key = code[code.length - 1];

                const decoded = Buffer.alloc(5);
                for (let i = 0; i < decoded.length; i++) {
                    const byte = code.readUInt8(i);
                    decoded.writeUInt8(byte ^ key, i);
                }

                const word = decoded.toString("utf-8");
                if (!word.match(/^[A-Z]{5}$/)) throw Error("Invalid code");

                setCorrectWord(decoded.toString("utf-8"));
            }
        } catch (e) {
            router.push("/");
        }
    }, [router]);

    return (
        <div>
            <p>{correctWord}</p>
        </div>
    );
}
