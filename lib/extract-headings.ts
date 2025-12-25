// Utility to extract headings from markdown content for Table of Contents

export interface Heading {
    id: string;
    text: string;
    level: number;
}

export function extractHeadings(content: string): Heading[] {
    const headings: Heading[] = [];
    const lines = content.split("\n");

    lines.forEach((line) => {
        const trimmed = line.trim();

        // Match H2 headings (##)
        if (trimmed.startsWith("## ") && !trimmed.startsWith("###")) {
            const text = trimmed.substring(3).trim();
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            headings.push({ id, text, level: 2 });
        }

        // Match H3 headings (###)
        if (trimmed.startsWith("### ")) {
            const text = trimmed.substring(4).trim();
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            headings.push({ id, text, level: 3 });
        }
    });

    return headings;
}

