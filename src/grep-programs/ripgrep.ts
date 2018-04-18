const child_process = require("child_process");
import { IGrep } from "../interfaces/IGrep";
import { Selector } from "../selector";
import { Selectors } from "../selectors";

class RipGrep implements IGrep {

    public run(cssFilePath: string, searchOnly: string = "."): Selector[]  {
        const selectors = new Selectors();
        const cleanSelectors = selectors.clean(selectors.fromFile(cssFilePath));
        return selectors.findUsages(this, searchOnly, cleanSelectors);
    }

    public call(selector: string, path: string) {
        const call = child_process.spawnSync(
            "rg",
            [
                "-i",
                "--iglob=!*.{css,scss}",
                selector,
                path,
            ],
            {
                stdio: "pipe",
                encoding: "utf-8",
            },
        );

        return call;
    }
}

export { RipGrep };
