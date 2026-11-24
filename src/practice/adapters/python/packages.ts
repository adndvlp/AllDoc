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
      "et-xmlfile": {
        "name": "et-xmlfile",
        "imports": [
          "et_xmlfile"
        ],
        "depends": [],
        "install_dir": "site",
        "package_type": "package",
        "version": "2.0.0",
        "file_name": "et_xmlfile-2.0.0-py3-none-any.whl",
        "sha256": "7a91720bc756843502c3b7504c77b8fe44217c85c537d85037f0f536151b2caa"
      },
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
      "openpyxl": {
        "name": "openpyxl",
        "imports": [
          "openpyxl"
        ],
        "depends": [
          "et-xmlfile"
        ],
        "install_dir": "site",
        "package_type": "package",
        "version": "3.1.5",
        "file_name": "openpyxl-3.1.5-py2.py3-none-any.whl",
        "sha256": "5282c12b107bffeef825f4617dc029afaf41d0ea60823bbb665ef3079dc79de2"
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
      "scipy": {
        "depends": [
          "numpy"
        ],
        "file_name": "scipy-1.18.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "scipy"
        ],
        "install_dir": "site",
        "name": "scipy",
        "package_type": "package",
        "sha256": "17ee329a957863516d1bb6a6aaa0c60576fac027e9cd3d43de27f58b5b599b50",
        "tool": {},
        "unvendored_tests": true,
        "version": "1.18.0"
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
      },
      "sqlalchemy": {
        "depends": [
          "typing-extensions"
        ],
        "file_name": "sqlalchemy-2.0.48-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "sqlalchemy"
        ],
        "install_dir": "site",
        "name": "sqlalchemy",
        "package_type": "package",
        "sha256": "e12ade7bb0e2746d59fddb40ed0a26caf70d2d3bb483e2e022850939322c5105",
        "tool": {},
        "unvendored_tests": true,
        "version": "2.0.48"
      },
      "typing-extensions": {
        "depends": [],
        "file_name": "typing_extensions-4.15.0-py3-none-any.whl",
        "imports": [
          "typing_extensions"
        ],
        "install_dir": "site",
        "name": "typing-extensions",
        "package_type": "package",
        "sha256": "4fec68770a05408e668a4fa53d6bf4f0f684b9dacf820c7c5d6e97d3ad225e29",
        "tool": {},
        "unvendored_tests": false,
        "version": "4.15.0"
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
    "six": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/six-1.17.0-py2.py3-none-any.whl",
    "et-xmlfile": "https://files.pythonhosted.org/packages/c1/8b/5fe2cc11fee489817272089c4203e679c63b570a5aaeb18d852ae3cbba6a/et_xmlfile-2.0.0-py3-none-any.whl",
    "openpyxl": "https://files.pythonhosted.org/packages/c0/da/977ded879c29cbd04de313843e76868e6e13408a94ed6b987245dc7c8506/openpyxl-3.1.5-py2.py3-none-any.whl",
    "scipy": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/scipy-1.18.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "sqlalchemy": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/sqlalchemy-2.0.48-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "typing-extensions": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/typing_extensions-4.15.0-py3-none-any.whl"
  },
  "digest": "2a847371d17e8a72211f79c6450d84196d7a1210916a06eb3484181775d7fcff"
} as const;
