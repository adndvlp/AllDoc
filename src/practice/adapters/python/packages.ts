// Generado por npm run prepare:python. Versiones y SHA-256 fijados.
export const pythonPackages = {
  "runtimeVersion": "314.0.8",
  "pythonVersion": "3.14.2",
  "lock": {
    "info": {
      "abi_version": "2026_0",
      "arch": "wasm32",
      "platform": "emscripten_5_0_3",
      "python": "3.14.2"
    },
    "packages": {
      "jedi": {
        "depends": [
          "parso"
        ],
        "file_name": "jedi-0.20.1-py2.py3-none-any.whl",
        "imports": [
          "jedi"
        ],
        "install_dir": "site",
        "name": "jedi",
        "package_type": "package",
        "sha256": "0fb16d86c4a4c73c37ba518c77419975e30fcc620658a8d14fbb5720cdd34142",
        "tool": {},
        "unvendored_tests": true,
        "version": "0.20.1"
      },
      "numpy": {
        "depends": [],
        "file_name": "numpy-2.4.6-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "numpy"
        ],
        "install_dir": "site",
        "name": "numpy",
        "package_type": "package",
        "sha256": "a292c1f5d7d8a2208cd5e94fc467604c131cabcd2fc14fed6eefde121e7fabdf",
        "tool": {},
        "unvendored_tests": false,
        "version": "2.4.6"
      },
      "pandas": {
        "depends": [
          "numpy",
          "python-dateutil",
          "pytz"
        ],
        "file_name": "pandas-3.0.2-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "pandas"
        ],
        "install_dir": "site",
        "name": "pandas",
        "package_type": "package",
        "sha256": "45ff57772cc2f366a8582c7d3097cc4e6676342ecd5a3c08184a43462d5a02ae",
        "tool": {},
        "unvendored_tests": true,
        "version": "3.0.2"
      },
      "parso": {
        "depends": [],
        "file_name": "parso-0.8.7-py2.py3-none-any.whl",
        "imports": [
          "parso"
        ],
        "install_dir": "site",
        "name": "parso",
        "package_type": "package",
        "sha256": "a8926eb2a1b915486941fdbd31e86a4baf88fe8c210f25f2f35ecec5b574ca1c",
        "tool": {},
        "unvendored_tests": false,
        "version": "0.8.7"
      },
      "python-dateutil": {
        "depends": [
          "six"
        ],
        "file_name": "python_dateutil-2.9.0.post0-py2.py3-none-any.whl",
        "imports": [
          "dateutil"
        ],
        "install_dir": "site",
        "name": "python-dateutil",
        "package_type": "package",
        "sha256": "9b13365edf9c188f570baf9c540bbb3029ada2a2dacb9694b3659941693ee9e5",
        "tool": {},
        "unvendored_tests": false,
        "version": "2.9.0.post0"
      },
      "pytz": {
        "depends": [],
        "file_name": "pytz-2026.1.post1-py2.py3-none-any.whl",
        "imports": [
          "pytz"
        ],
        "install_dir": "site",
        "name": "pytz",
        "package_type": "package",
        "sha256": "b8249d6450146e0b61e6d710dc02ebb35a904796c4c2f97fe87d4ac5872db36a",
        "tool": {},
        "unvendored_tests": false,
        "version": "2026.1.post1"
      },
      "six": {
        "depends": [],
        "file_name": "six-1.17.0-py2.py3-none-any.whl",
        "imports": [
          "six"
        ],
        "install_dir": "site",
        "name": "six",
        "package_type": "package",
        "sha256": "228c50f73aa7addf2c2ccf2979c256802a59ab69cad8152b31b9443cc8140f42",
        "tool": {},
        "unvendored_tests": false,
        "version": "1.17.0"
      }
    }
  },
  "sources": {
    "jedi": "https://files.pythonhosted.org/packages/be/c7/71eb0d51cdcbb63b857c931aa4e9218b078b5d9f8ecd383b234f28fe7b0f/jedi-0.20.1-py2.py3-none-any.whl",
    "parso": "https://files.pythonhosted.org/packages/99/5d/8268b644392ee874ee82a635cd0df1773de230bde356c38de28e298392cc/parso-0.8.7-py2.py3-none-any.whl",
    "numpy": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/numpy-2.4.6-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "pandas": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/pandas-3.0.2-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "python-dateutil": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/python_dateutil-2.9.0.post0-py2.py3-none-any.whl",
    "pytz": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/pytz-2026.1.post1-py2.py3-none-any.whl",
    "six": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/six-1.17.0-py2.py3-none-any.whl"
  },
  "digest": "b45b8bb4e8c828466384dd7940e6afa60ea495c4ccd5a96cb83efb8f2e69a257"
} as const;
