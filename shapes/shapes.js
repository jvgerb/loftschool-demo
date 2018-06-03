// x, y, size, strokeColor, strokeWidth, fillColor, useGradient

class Shape {
    constructor(x, y, size) {
        this.setPosition(x, y);
        this.setSize(size);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setSize(size) {
        this.size = size < 0 ? 0 : size;
    }

    setStrokeColor(color) {
        this.strokeColor = color;
    }

    setFillColor(color) {
        this.fillColor = color;
    }

    setStrokeWidth(width) {
        this.strokeWidth = width;
    }

    setUseGradient(useGradient) {
        this.useGradient = useGradient;
    }

    canRender() {
        return (
            Number.isFinite(this.size) &&
            Number.isFinite(this.x) &&
            Number.isFinite(this.y)
        );
    }

    setFillStyle(ctx) {
        if (!this.useGradient) {
            ctx.fillStyle = this.fillColor;
            return;
        }

        var grd = ctx.createRadialGradient(0, 0, this.size / 16,
            this.size / 16, this.size / 16, this.size);
        grd.addColorStop(0, this.fillColor);
        grd.addColorStop(1, '#fff');

        ctx.fillStyle = grd;
    }

    fillShape(ctx, useGradient) {
        this.setFillStyle(ctx, useGradient);
        ctx.fill();
        ctx.lineWidth = this.strokeWidth;

        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
    }

    render(ctx) {
        throw new Error("this is an abstract shape");
    }
}

class Circle extends Shape {

    render(ctx) {
        ctx.beginPath();

        ctx.arc(0, 0, this.size / 2, 0, 2 * Math.PI, false);
        this.fillShape(ctx);
    }
}

class Quad extends Shape {

    render(ctx) {
        ctx.beginPath();

        ctx.rect(-this.size / 2, -this.size / 2,
            this.size,
            this.size
        );

        this.fillShape(ctx);
    }
}

class Triangle extends Shape {

    render(ctx) {
        ctx.beginPath();

        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(this.size / 2, this.size / 2);
        ctx.lineTo(-this.size / 2, this.size / 2);
        ctx.closePath();

        this.fillShape(ctx);
    }
}

class Heart extends Shape {

    setFillStyle(ctx) {
        if (!this.useGradient) {
            ctx.fillStyle = this.fillColor;
            return;
        }

        var grd = ctx.createLinearGradient(0, 0, this.size, this.size);
        grd.addColorStop(0, '#fff');
        grd.addColorStop(0.5, this.fillColor);
        grd.addColorStop(1, '#000');

        ctx.fillStyle = grd;
    }

    render(ctx) {

        ctx.beginPath();
        var w = this.size,
            h = this.size;

        var d = Math.min(w, h);
        var k = 0;

        ctx.moveTo(k, k + d / 4);
        ctx.quadraticCurveTo(k, k, k + d / 4, k);
        ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
        ctx.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);
        ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4);
        ctx.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);
        ctx.lineTo(k + d / 2, k + d);
        ctx.lineTo(k + d / 4, k + d * 3 / 4);
        ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
        ctx.closePath();

        this.fillShape(ctx);
    }
}