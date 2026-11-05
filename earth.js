const distanceSlider = document.querySelector("#distance-slider");

if (distanceSlider) {
    const earthRadiusMeters = 6_371_000;
    const distanceOutput = document.querySelector("#distance-output");
    const dropOutput = document.querySelector("#drop-output");
    const angleOutput = document.querySelector("#angle-output");
    const tangentLine = document.querySelector("#tangent-line");
    const surfaceArc = document.querySelector("#surface-arc");
    const surfaceFill = document.querySelector(".surface-fill");
    const dropLine = document.querySelector("#drop-line");
    const targetDot = document.querySelector("#target-dot");
    const distanceLabel = document.querySelector("#distance-label");
    const dropLabel = document.querySelector("#drop-label");
    const diagramAngle = document.querySelector("#diagram-angle");
    const farLabel = document.querySelector("#far-label");

    function updateCurvature() {
        const distanceKm = Number(distanceSlider.value);
        const distanceMeters = distanceKm * 1000;
        const centralAngle = distanceMeters / earthRadiusMeters;
        const dropMeters = earthRadiusMeters * (1 - Math.cos(centralAngle));
        const angleDegrees = centralAngle * (180 / Math.PI);
        const formattedDrop = dropMeters < 1
            ? `${(dropMeters * 100).toFixed(1)} cm`
            : `${dropMeters.toFixed(1)} m`;

        distanceOutput.value = `${distanceKm} km`;
        distanceOutput.textContent = `${distanceKm} km`;
        dropOutput.textContent = formattedDrop;
        angleOutput.textContent = `${angleDegrees.toFixed(3)}°`;

        const startX = 110;
        const endX = startX + 5 * distanceKm;
        const displayDrop = 112 * (distanceKm / Number(distanceSlider.max)) ** 2;
        const endY = 124 + displayDrop;
        const middleX = (startX + endX) / 2;
        const path = `M${startX} 124 Q${middleX} 124 ${endX} ${endY}`;

        tangentLine.setAttribute("x2", endX);
        surfaceArc.setAttribute("d", path);
        surfaceFill.setAttribute("d", `${path} L${endX} 270 L${startX} 270 Z`);
        dropLine.setAttribute("x1", endX);
        dropLine.setAttribute("x2", endX);
        dropLine.setAttribute("y2", endY);
        targetDot.setAttribute("cx", endX);
        targetDot.setAttribute("cy", endY);
        distanceLabel.setAttribute("x", middleX);
        distanceLabel.textContent = `${distanceKm} km along the surface`;
        dropLabel.setAttribute("x", Math.min(endX + 12, 645));
        dropLabel.setAttribute("y", 124 + displayDrop / 2 + 5);
        dropLabel.textContent = formattedDrop;
        diagramAngle.textContent = `${angleDegrees.toFixed(3)}°`;
        farLabel.setAttribute("x", endX);
        farLabel.setAttribute("visibility", endX < 185 ? "hidden" : "visible");
    }

    distanceSlider.addEventListener("input", updateCurvature);
    updateCurvature();
}