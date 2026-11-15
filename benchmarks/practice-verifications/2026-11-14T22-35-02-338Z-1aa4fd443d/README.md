# Aceptación de práctica — punto 8

Estado: **partial**. Modo: measure-only.

Fuente: `1aa4fd443d3509b263fa0fc9616099f7773839f46e29ffebcc3fcc73e00ed963`. Inicio: 2026-11-14T22:35:02.338Z.

Los tiempos son un proxy de laboratorio DOM + siguiente rAF. No son INP de campo. La carga fría y la ejecución se registran por separado.

## Comprobaciones


## Rendimiento

| Tamaño | Perfil | Acción | Muestras | p95 ms | Límite ms | Estado |
| --- | --- | --- | ---: | ---: | ---: | --- |

Muestras y fases: [measurements.json](measurements.json). Bundle inicial: [bundle-comparison.json](bundle-comparison.json).

La referencia anterior a práctica permite comparar bytes iniciales. No contiene latencias de un panel que aún no existía.

## Criterios

| ID | Criterio | Evidencia ejecutada |
| --- | --- | --- |

Los casos concretos y sus proyectos están en verification.json. Las referencias visuales deben permanecer idénticas durante la ejecución.

## Revisión y límites

Pendiente revisar las capturas de screenshots/ y las trazas de traces/. Las trazas son reproducciones posteriores y no sustituyen las muestras.


Fallo en preflight:

```text
browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> /Users/andresitopacheco/Library/Caches/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-mac-arm64/chrome-headless-shell --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,DestroyProfileOnBrowserClose,HttpsUpgrades,HttpsFirstBalancedModeAutoEnable,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,AvoidCorsURLLoaderRestartOnRedirect,TcpPortRandomizationWin,OptimizationHints,NetworkTimeServiceQuerying,AimEnabled,PreconnectToSearch,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface,SkipListAccountsWithoutGaiaCookies --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --disable-updater-scheduler --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --enable-unsafe-swiftshader --edge-skip-compat-layer-relaunch --disable-stack-profiler --disable-infobars --disable-sync --do-not-de-elevate --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/s9/pxf5v35115795ym09k5vg7pm0000gn/T/playwright_chromiumdev_profile-qdzAG1 --remote-debugging-pipe --no-startup-window
<launched> pid=65565
[pid=65565][err] [1114/163502.524534:ERROR:base/power_monitor/thermal_state_observer_mac.mm:122] ThermalStateObserverMac unable to register to power notifications. Result: 9
[pid=65565][err] [1114/163502.550554:ERROR:net/dns/dns_config_service_posix.cc:139] DNS config watch failed to start.
[pid=65565][err] [1114/163502.552843:WARNING:net/dns/dns_config_service_posix.cc:198] Failed to read DnsConfig.
[pid=65565][err] [1114/163502.566173:FATAL:base/apple/mach_port_rendezvous_mac.cc:159] Check failed: kr == KERN_SUCCESS. bootstrap_check_in org.chromium.Chromium.MachPortRendezvousServer.65565: Permission denied (1100)
[pid=65565] <process did exit: exitCode=null, signal=SIGTRAP>
[pid=65565] starting temporary directories cleanup
Call log:
[2m  - <launching> /Users/andresitopacheco/Library/Caches/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-mac-arm64/chrome-headless-shell --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,DestroyProfileOnBrowserClose,HttpsUpgrades,HttpsFirstBalancedModeAutoEnable,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,AvoidCorsURLLoaderRestartOnRedirect,TcpPortRandomizationWin,OptimizationHints,NetworkTimeServiceQuerying,AimEnabled,PreconnectToSearch,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface,SkipListAccountsWithoutGaiaCookies --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --disable-updater-scheduler --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --enable-unsafe-swiftshader --edge-skip-compat-layer-relaunch --disable-stack-profiler --disable-infobars --disable-sync --do-not-de-elevate --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/s9/pxf5v35115795ym09k5vg7pm0000gn/T/playwright_chromiumdev_profile-qdzAG1 --remote-debugging-pipe --no-startup-window[22m
[2m  - <launched> pid=65565[22m
[2m  - [pid=65565][err] [1114/163502.524534:ERROR:base/power_monitor/thermal_state_observer_mac.mm:122] ThermalStateObserverMac unable to register to power notifications. Result: 9[22m
[2m  - [pid=65565][err] [1114/163502.550554:ERROR:net/dns/dns_config_service_posix.cc:139] DNS config watch failed to start.[22m
[2m  - [pid=65565][err] [1114/163502.552843:WARNING:net/dns/dns_config_service_posix.cc:198] Failed to read DnsConfig.[22m
[2m  - [pid=65565][err] [1114/163502.566173:FATAL:base/apple/mach_port_rendezvous_mac.cc:159] Check failed: kr == KERN_SUCCESS. bootstrap_check_in org.chromium.Chromium.MachPortRendezvousServer.65565: Permission denied (1100)[22m
[2m  - [pid=65565] <process did exit: exitCode=null, signal=SIGTRAP>[22m
[2m  - [pid=65565] starting temporary directories cleanup[22m
[2m  - [pid=65565] <gracefully close start>[22m
[2m  - [pid=65565] <kill>[22m
[2m  - [pid=65565] <skipped force kill spawnedProcess.killed=false processClosed=true>[22m
[2m  - [pid=65565] finished temporary directories cleanup[22m
[2m  - [pid=65565] <gracefully close end>[22m

```
