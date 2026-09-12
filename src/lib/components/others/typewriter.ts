
export type TypeTextOp = {
    ty: "type";
    value: string;
    noanim?: boolean;
    // When deleting this text, how many extra instructions (before this) to also delete
    delete_extra?: number;
};

export type DeleteTextOp = {
    ty: "del";
    value: number;
    noanim?: boolean;
};

export type TextOp =
    | TypeTextOp
    | DeleteTextOp
    | {
        ty: "goto";
        value: number;
    }
    | {
        ty: "wait";
        value: number;
    }
    | {
        ty: "fallback";
        value: string;
    };


export enum LoopOperations {
    LoadNext,
    Skip,
    Exit
}

export const tti_type = (characters: string) =>
    ({ ty: "type", value: characters }) as TypeTextOp;
export const tti_insert = (word: string) =>
    ({ ty: "type", value: word, noanim: true }) as TypeTextOp;
export const tti_del = (n: number, noanim?: boolean) =>
    ({ ty: "del", value: n, noanim }) as TextOp;
export const tti_wait = (n: number) =>
    ({ ty: "wait", value: n }) as TextOp;
export const tti_goto = (step_index: number) =>
    ({ ty: "goto", value: step_index }) as TextOp;

export class TextTyper {
    private word_lens: TypeTextOp[] = [];
    private instructs: TextOp[] = [];

    private fallback: string = "";

    /**
     * Types out the characters in sequence
     */
    seq(chars: string): this {
        const x = tti_type(chars);
        this.word_lens.push(x);
        this.instructs.push(x);
        this.fallback += chars;
        return this;
    }

    /**
     * Inserts the text immediately. Useful for things like html.
     */
    ins(text: string): this {
        const x = tti_insert(text);
        this.word_lens.push(x);
        this.instructs.push(x);
        this.fallback += text;
        return this;
    }

    /**Deletes the previous seq or ins.*/
    prev(instant = false): this {
        const last = this.word_lens.pop();
        if (!last) return this;
        this.instructs.push(tti_del(last.value.length, instant));
        this.fallback = this.fallback.slice(
            0,
            this.fallback.length - last.value.length,
        );
        return this;
    }

    /**
     * Styled seq. Note that this inserts 3 instructions. Hence autoprev should use 3 as the parameter
     */
    styled_seq(
        text: string,
        opts?: { class?: string; style?: string },
    ): this {
        let attrs_s = "";

        if (opts?.class !== undefined) {
            attrs_s += `class="${opts.class}" `;
        }
        if (opts?.style !== undefined) {
            attrs_s += `style="${opts.style}" `;
        }
        this.ins(`<span ${attrs_s}>`).seq(text).ins("</span>");
        this.word_lens[this.word_lens.length - 1].delete_extra = 2; // Also delete the 2 prev text blocks
        return this;
    }

    /**Deletes the n previous seq or ins. If ins, deletes words instantly*/
    autoprev(n: number = 1): this {
        for (let _index = 0; _index < n; _index++) {
            const last = this.word_lens.pop();
            if (!last) return this;

            if (last.delete_extra) {
                _index -= last.delete_extra;
            }

            this.instructs.push(tti_del(last.value.length, last.noanim));
            this.fallback = this.fallback.slice(
                0,
                this.fallback.length - last.value.length,
            );
        }
        return this;
    }

    /**
     * Wait abit before continuing to the next instruction
     * @param n Delay in ms
     */
    wait(n: number): this {
        this.instructs.push(tti_wait(n));
        return this;
    }

    /**
     * Inserts a raw tti_goto instruction
     *
     * Not recommended. You should do repeated tests and tries to get the value you need as some methods in this class inserts multiple instructions.
     *
     * @param n
     */
    tti_goto(n: number): this {
        this.instructs.push(tti_goto(n));
        return this;
    }

    /**
     * Returns the final text instructions.
     *
     * This will return the both instructions and a fallback string if javascript is not enabled
     */
    build(): TypewriterInputs {
        return { instructs: this.instructs, fallback: this.fallback };
    }
}
export type TypewriterInputs = { instructs: TextOp[]; fallback: string }