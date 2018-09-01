 #!/bin/bash
 

inkscape -D -z --file=figures/life-cycle-process-groups.svg --export-pdf=figures/life-cycle-process-groups.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-agreement-processes.svg --export-pdf=figures/life-cycle-process-groups-agreement-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-organizational-project-enabling-processes.svg --export-pdf=figures/life-cycle-process-groups-organizational-project-enabling-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-project-processes.svg --export-pdf=figures/life-cycle-process-groups-project-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-organizational-processes.svg --export-pdf=figures/life-cycle-process-groups-organizational-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-technical-processes.svg --export-pdf=figures/life-cycle-process-groups-technical-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-software-implementation-processes.svg --export-pdf=figures/life-cycle-process-groups-software-implementation-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-software-support-processes.svg --export-pdf=figures/life-cycle-process-groups-software-support-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-software-reuse-processes.svg --export-pdf=figures/life-cycle-process-groups-software-reuse-processes.pdf;



inkscape -D -z --file=figures/life-cycle-process-groups-lower-level-processes.svg --export-pdf=figures/life-cycle-process-groups-lower-level-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-lower-level-acquisition-processes.svg --export-pdf=figures/life-cycle-process-groups-lower-level-acquisition-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-lower-level-supply-processes.svg --export-pdf=figures/life-cycle-process-groups-lower-level-supply-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-lower-level-life-cycle-model-management-processes.svg --export-pdf=figures/life-cycle-process-groups-lower-level-life-cycle-model-management-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-lower-level-human-resource-management-processes.svg --export-pdf=figures/life-cycle-process-groups-lower-level-human-resource-management-processes.pdf;

inkscape -D -z --file=figures/life-cycle-process-groups-lower-level-software-operation-processes.svg --export-pdf=figures/life-cycle-process-groups-lower-level-software-operation-processes.pdf;



pdflatex Common\ Framework\ for\ Life\ Cycles\ And\ their\ Processes.tex;

pdflatex Common\ Framework\ for\ Life\ Cycles\ And\ their\ Processes.tex;


cd ../../../;


./makedocs.sh;