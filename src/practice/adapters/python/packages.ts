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
      "anyio": {
        "depends": [
          "sniffio",
          "typing-extensions"
        ],
        "file_name": "anyio-4.13.0-py3-none-any.whl",
        "imports": [
          "anyio"
        ],
        "install_dir": "site",
        "name": "anyio",
        "package_type": "package",
        "sha256": "ea08c971f29d33d940864407ceb08601836ac8924d3b4f27db6612ed47faeafc",
        "tool": {},
        "unvendored_tests": false,
        "version": "4.13.0"
      },
      "beautifulsoup4": {
        "depends": [
          "soupsieve",
          "typing-extensions"
        ],
        "file_name": "beautifulsoup4-4.14.3-py3-none-any.whl",
        "imports": [
          "bs4"
        ],
        "install_dir": "site",
        "name": "beautifulsoup4",
        "package_type": "package",
        "sha256": "60e71fb66c245d535d80c63a9ab922ee2ab086624a04e0995bc601bfea0ef750",
        "tool": {},
        "unvendored_tests": false,
        "version": "4.14.3"
      },
      "certifi": {
        "depends": [],
        "file_name": "certifi-2026.4.22-py3-none-any.whl",
        "imports": [
          "certifi"
        ],
        "install_dir": "site",
        "name": "certifi",
        "package_type": "package",
        "sha256": "c2c0091986db798df5fd84582d289496f31244a898ec032b7015278c2d82c80c",
        "tool": {},
        "unvendored_tests": false,
        "version": "2026.4.22"
      },
      "charset-normalizer": {
        "depends": [],
        "file_name": "charset_normalizer-3.4.7-py3-none-any.whl",
        "imports": [
          "charset_normalizer"
        ],
        "install_dir": "site",
        "name": "charset-normalizer",
        "package_type": "package",
        "sha256": "9e437ef92fa51f06eedeb1ef092c0a887bd24fe0d40b1e900191117ce1653121",
        "tool": {},
        "unvendored_tests": false,
        "version": "3.4.7"
      },
      "contourpy": {
        "depends": [
          "numpy"
        ],
        "file_name": "contourpy-1.3.3-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "contourpy"
        ],
        "install_dir": "site",
        "name": "contourpy",
        "package_type": "package",
        "sha256": "0ac15ebf9f820d2d1c3526388aa2818b631cb6c4aae1682efd6b4cc12c1f302c",
        "tool": {},
        "unvendored_tests": false,
        "version": "1.3.3"
      },
      "cycler": {
        "depends": [
          "six"
        ],
        "file_name": "cycler-0.12.1-py3-none-any.whl",
        "imports": [
          "cycler"
        ],
        "install_dir": "site",
        "name": "cycler",
        "package_type": "package",
        "sha256": "8ee450085f15b47f78b034d60059af6a3649e98fa5dde073363437742cc0b4ea",
        "tool": {},
        "unvendored_tests": false,
        "version": "0.12.1"
      },
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
      "fonttools": {
        "depends": [],
        "file_name": "fonttools-4.62.1-py3-none-any.whl",
        "imports": [
          "fontTools"
        ],
        "install_dir": "site",
        "name": "fonttools",
        "package_type": "package",
        "sha256": "0d1516e073fd0a8d8e6d9af46417b6a26209a42518024a18f7085e72d2599605",
        "tool": {},
        "unvendored_tests": false,
        "version": "4.62.1"
      },
      "h11": {
        "depends": [],
        "file_name": "h11-0.16.0-py3-none-any.whl",
        "imports": [
          "h11"
        ],
        "install_dir": "site",
        "name": "h11",
        "package_type": "package",
        "sha256": "d920caa25363694bc8de71ba42e5e2bc3353c8df6bcf5025551386e279bca264",
        "tool": {},
        "unvendored_tests": false,
        "version": "0.16.0"
      },
      "httpcore": {
        "depends": [
          "certifi",
          "h11"
        ],
        "file_name": "httpcore-1.0.9-py3-none-any.whl",
        "imports": [
          "httpcore"
        ],
        "install_dir": "site",
        "name": "httpcore",
        "package_type": "package",
        "sha256": "27bc91994ad7e21a8333608b8ba5e2b9655ae9d86820d4cefb03dd8db8c5de48",
        "tool": {},
        "unvendored_tests": false,
        "version": "1.0.9"
      },
      "httpx": {
        "depends": [
          "anyio",
          "certifi",
          "httpcore",
          "idna"
        ],
        "file_name": "httpx-0.28.1-py3-none-any.whl",
        "imports": [
          "httpx"
        ],
        "install_dir": "site",
        "name": "httpx",
        "package_type": "package",
        "sha256": "830cb1ec73bb4c46f2e38ebeb3dd50ffb45f62b804dd040519d34fe36f8fdfc7",
        "tool": {},
        "unvendored_tests": false,
        "version": "0.28.1"
      },
      "idna": {
        "depends": [],
        "file_name": "idna-3.11-py3-none-any.whl",
        "imports": [
          "idna"
        ],
        "install_dir": "site",
        "name": "idna",
        "package_type": "package",
        "sha256": "1619419bc899f07c7a608a12e8238e5e0bc15bb25fec90cfe20a86bb849ba0d8",
        "tool": {},
        "unvendored_tests": false,
        "version": "3.11"
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
      "kiwisolver": {
        "depends": [],
        "file_name": "kiwisolver-1.5.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "kiwisolver"
        ],
        "install_dir": "site",
        "name": "kiwisolver",
        "package_type": "package",
        "sha256": "47781998156721147c128a3c74547d5703e0e3cc454d8203e629339368308a93",
        "tool": {},
        "unvendored_tests": false,
        "version": "1.5.0"
      },
      "matplotlib": {
        "depends": [
          "contourpy",
          "cycler",
          "fonttools",
          "kiwisolver",
          "numpy",
          "packaging",
          "pillow",
          "pyparsing",
          "python-dateutil",
          "pytz"
        ],
        "file_name": "matplotlib-3.10.8-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "pylab",
          "mpl_toolkits",
          "matplotlib"
        ],
        "install_dir": "site",
        "name": "matplotlib",
        "package_type": "package",
        "sha256": "722857932f8f62eac64f8439af15c94d427f9fb945f9590cd242805c983d2d54",
        "tool": {},
        "unvendored_tests": true,
        "version": "3.10.8"
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
      "packaging": {
        "depends": [],
        "file_name": "packaging-26.1-py3-none-any.whl",
        "imports": [
          "packaging"
        ],
        "install_dir": "site",
        "name": "packaging",
        "package_type": "package",
        "sha256": "565acbbea54da30348b6d68b6a54373e6f777987db9f1db6966b4b3a5060d303",
        "tool": {},
        "unvendored_tests": false,
        "version": "26.1"
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
      "patsy": {
        "depends": [
          "numpy",
          "six"
        ],
        "file_name": "patsy-1.0.2-py2.py3-none-any.whl",
        "imports": [
          "patsy"
        ],
        "install_dir": "site",
        "name": "patsy",
        "package_type": "package",
        "sha256": "64e931013dc7c23d2661327531b04c4370605cd439cdee4bb1a55846c5f41771",
        "tool": {},
        "unvendored_tests": true,
        "version": "1.0.2"
      },
      "pillow": {
        "depends": [],
        "file_name": "pillow-12.2.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "PIL"
        ],
        "install_dir": "site",
        "name": "Pillow",
        "package_type": "package",
        "sha256": "e29838b7a756e4ee0f27a9cfa9a387ee0dfa2e9dd44be2dd595130b9f9d93ac3",
        "tool": {},
        "unvendored_tests": false,
        "version": "12.2.0"
      },
      "pyparsing": {
        "depends": [],
        "file_name": "pyparsing-3.3.2-py3-none-any.whl",
        "imports": [
          "pyparsing"
        ],
        "install_dir": "site",
        "name": "pyparsing",
        "package_type": "package",
        "sha256": "f0dd8225b5f8e945980b400bd465b4b90cb0498a2eede0d9dbea98372f6110c5",
        "tool": {},
        "unvendored_tests": false,
        "version": "3.3.2"
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
      "requests": {
        "depends": [
          "charset-normalizer",
          "idna",
          "urllib3",
          "certifi"
        ],
        "file_name": "requests-2.33.1-py3-none-any.whl",
        "imports": [
          "requests"
        ],
        "install_dir": "site",
        "name": "requests",
        "package_type": "package",
        "sha256": "6d62c51c4e7707386bfc2ef54845c16cdaeb99606c064357cccfe4d621285175",
        "tool": {},
        "unvendored_tests": false,
        "version": "2.33.1"
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
      "seaborn": {
        "name": "seaborn",
        "imports": [
          "seaborn"
        ],
        "depends": [
          "numpy",
          "pandas",
          "matplotlib",
          "scipy",
          "statsmodels"
        ],
        "install_dir": "site",
        "package_type": "package",
        "version": "0.13.2",
        "file_name": "seaborn-0.13.2-py3-none-any.whl",
        "sha256": "636f8336facf092165e27924f223d3c62ca560b1f2bb5dff7ab7fad265361987"
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
      "sniffio": {
        "depends": [],
        "file_name": "sniffio-1.3.1-py3-none-any.whl",
        "imports": [
          "sniffio"
        ],
        "install_dir": "site",
        "name": "sniffio",
        "package_type": "package",
        "sha256": "1e0f350ca8eac5252c1af9a8d93a7edd70056c1eddf5661f6950688094d1f670",
        "tool": {},
        "unvendored_tests": true,
        "version": "1.3.1"
      },
      "soupsieve": {
        "depends": [],
        "file_name": "soupsieve-2.8.3-py3-none-any.whl",
        "imports": [
          "soupsieve"
        ],
        "install_dir": "site",
        "name": "soupsieve",
        "package_type": "package",
        "sha256": "675af05b7a3de6b5f8e0b89eb7644364a809af5f374b911b9f8c6225417c3299",
        "tool": {},
        "unvendored_tests": false,
        "version": "2.8.3"
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
      "statsmodels": {
        "depends": [
          "numpy",
          "scipy",
          "pandas",
          "patsy",
          "packaging"
        ],
        "file_name": "statsmodels-0.14.6-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
        "imports": [
          "statsmodels"
        ],
        "install_dir": "site",
        "name": "statsmodels",
        "package_type": "package",
        "sha256": "8ee50091810f8ac540a4b94eeba777028cfe8200a78bc5367ea01ad2d6a3a951",
        "tool": {},
        "unvendored_tests": false,
        "version": "0.14.6"
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
      },
      "urllib3": {
        "depends": [],
        "file_name": "urllib3-2.6.3-py3-none-any.whl",
        "imports": [
          "urllib3"
        ],
        "install_dir": "site",
        "name": "urllib3",
        "package_type": "package",
        "sha256": "86b7c1af060597b115bcde5e36798039ca50b221afe14aa03d3437ac09b02a75",
        "tool": {},
        "unvendored_tests": false,
        "version": "2.6.3"
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
    "typing-extensions": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/typing_extensions-4.15.0-py3-none-any.whl",
    "contourpy": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/contourpy-1.3.3-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "cycler": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/cycler-0.12.1-py3-none-any.whl",
    "fonttools": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/fonttools-4.62.1-py3-none-any.whl",
    "kiwisolver": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/kiwisolver-1.5.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "matplotlib": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/matplotlib-3.10.8-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "packaging": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/packaging-26.1-py3-none-any.whl",
    "pillow": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/pillow-12.2.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "pyparsing": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/pyparsing-3.3.2-py3-none-any.whl",
    "seaborn": "https://files.pythonhosted.org/packages/83/11/00d3c3dfc25ad54e731d91449895a79e4bf2384dc3ac01809010ba88f6d5/seaborn-0.13.2-py3-none-any.whl",
    "patsy": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/patsy-1.0.2-py2.py3-none-any.whl",
    "statsmodels": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/statsmodels-0.14.6-cp314-cp314-pyemscripten_2026_0_wasm32.whl",
    "certifi": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/certifi-2026.4.22-py3-none-any.whl",
    "charset-normalizer": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/charset_normalizer-3.4.7-py3-none-any.whl",
    "idna": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/idna-3.11-py3-none-any.whl",
    "requests": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/requests-2.33.1-py3-none-any.whl",
    "urllib3": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/urllib3-2.6.3-py3-none-any.whl",
    "anyio": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/anyio-4.13.0-py3-none-any.whl",
    "beautifulsoup4": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/beautifulsoup4-4.14.3-py3-none-any.whl",
    "h11": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/h11-0.16.0-py3-none-any.whl",
    "httpcore": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/httpcore-1.0.9-py3-none-any.whl",
    "httpx": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/httpx-0.28.1-py3-none-any.whl",
    "sniffio": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/sniffio-1.3.1-py3-none-any.whl",
    "soupsieve": "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/soupsieve-2.8.3-py3-none-any.whl"
  },
  "digest": "e0369ddd66cf707274e2af5404bed6f23c8220dfa1f7c1fbe7f1c72d60ada14a"
} as const;
