/*
 * (resize.effect.ts) Resize ViewEffect implementation.
 * 
 * Copyright (c) 2023 Belousov Daniil
 * All rights reserved.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Licensed under the 'GNU General Public License v3.0'
 * For more information, please refer to <https://www.gnu.org/licenses/gpl-3.0.html>
 */

import { ViewEffect } from "./view-effect.type";

/**
 * ### View-Effects
 * Applies resizing effect to the `HTMLElement`, so it becomes resizeable
 * by the cursor.
 * 
 * When effectController is grabbed, by moving the cursor effectTarget
 * will properly rescale, until it does not fit into the window.
 */
export class ResizeViewEffect implements ViewEffect {

    public readonly enable: VoidFunction;
    public readonly disable: VoidFunction;

    /**
     * @param effectTarget View which will be resized by the effect.
     * 
     * @param effectController If provided, resize effect will be achived by drabbing
     * this {@link effectController} element, and not {@link effectTarget}. By default,
     * equals to {@link effectTarget}.
     * 
     * For example, you can achive desktop window behavior, when window
     * is resized by grabbing its corner.
     */
    constructor(effectTarget: HTMLElement, effectController: HTMLElement = effectTarget) {
        
        let offsetX = 0;
        let offsetY = 0;
        
        /**
         * Resizes target according to the offsets and current cursor position,
         * limiting resizing to the `window` sizes.
         */
        const resizeTarget = (e: MouseEvent) => {
            const left = e.clientX - offsetX;
            const top  = e.clientY - offsetY;
            effectTarget.style.width  = (e.clientX <= window.innerWidth  ? left : window.innerWidth  - offsetX) + 'px';
            effectTarget.style.height = (e.clientY <= window.innerHeight ? top  : window.innerHeight - offsetY) + 'px';
        };

        /**
         * Activates resizing effect itself, making {@link effectTarget}
         * being resized while user is grabbing and moving cursor.
         * @param e mouse event to set offset.
         */
        const activateEffect = () => {
            window.addEventListener('mouseup', deactivateDragging);
            offsetX = effectTarget.offsetLeft;
            offsetY = effectTarget.offsetTop;
            window.addEventListener('mousemove', resizeTarget);
        };

        /**
         * Clears events listeners when user stopped drabbing.
         */
        const deactivateDragging = () => {
            window.removeEventListener('mouseup', deactivateDragging);    
            window.removeEventListener('mousemove', resizeTarget);
        };

        this.enable = () => {
            return void effectController.addEventListener('mousedown', activateEffect);
        };

        this.disable = () => {
            return void effectController.removeEventListener('mousedown', activateEffect);
        };
    }
}