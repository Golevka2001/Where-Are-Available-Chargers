import os

"""
    预处理，用于将模板文件转换为 `mustache_templates.js`
"""

path: str = os.path.abspath(os.path.dirname(__file__))
output: map = {}

if __name__ == "__main__":
    with os.scandir(os.path.join(path, "mustache-templates")) as dirc:
        for entry in dirc:
            if entry.is_file() and entry.name.endswith(".mustache"):
                with open(entry.path, "r", encoding="utf-8") as template:
                    varname: str = entry.name[0:-9]
                    content: str = template.read()
                    output[varname] = content

    with open(
        os.path.join(path, "src", "mustache_templates.js"), "w", encoding="utf-8"
    ) as output_js:
        names: list = list()
        for key in output:
            output_js.write(f"const {key} = `{output[key]}`\n\n")
        output_js.write("export const mtemplate = {\n")
        for key in output:
            output_js.write(f"    '{key}': {key},\n")
        output_js.write("}")
