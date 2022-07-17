import "@testing-library/jest-dom/extend-expect";
import path from "path";
import ejs from "ejs";
import { JSDOM } from "jsdom";
import fs from "fs";

const targetFile = path.resolve(__dirname, "./views/index.ejs");

describe("[ROOT]", () => {
    test("should load header section", () => {
        ejs.renderFile(targetFile, function (err, htmlString) {
            if (err) {
                console.log(err);
            }
            if (htmlString) {
                let dom;
                let container;
                beforeEach(() => {
                    dom = new JSDOM(htmlString, {}, { runScripts: "dangerously" });
                    container = dom.window.document.body;
                });
                console.log(dom);
                expect(getByText(/MY TEXT/i)).toBeInTheDocument();
            }
        });
    });
});