/*
 * (drag.effect.ts) Drag ViewEffect implementation.
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
 * Applies grabbing effect to the `HTMLElement`, which makes it
 * possible to drag it around the surface by the cursor.
 * 
 * When effectController is grabbed, y moving the cursor effectTarget
 * will change it's position around the document.
 * (Don't forget to position to absolute/fixed)
 */
export class DragViewEffect implements ViewEffect {

    public readonly enable:  VoidFunction;
    public readonly disable: VoidFunction;

    /**
     * @param effectTarget View which shoud be dragged around the document.
     * 
     * @param effectController If provided, dragging effect will be achived by drabbing
     * this {@link effectController} element, and not {@link effectTarget}. By default,
     * equals to {@link effectTarget}.
     * 
     * For example, you can achive desktop app window behavior, when window
     * is moved around the screen only when its header is being dragged by the cursor,
     */
    constructor(effectTarget: HTMLElement, effectController: HTMLElement = effectTarget) {
        
        let offsetX = 0;
        let offsetY = 0;
        
        /**
         * Moves target according to offset and current cursor position.
         */
        const moveTarget = (e: MouseEvent) => {
            const left = offsetX + e.clientX;
            const top  = offsetY + e.clientY;
            effectTarget.style.left = (left >= 0 ? left + effectTarget.clientWidth  <= window.innerWidth  ? left : window.innerWidth  - effectTarget.clientWidth  : 0).toString() + 'px';
            effectTarget.style.top  = (top  >= 0 ? top  + effectTarget.clientHeight <= window.innerHeight ? top  : window.innerHeight - effectTarget.clientHeight : 0).toString() + 'px';
        };

        /**
         * Activates dragging effect itself, making {@link effectTarget}
         * be dragged while user is grabbing the {@link effectController}.
         * @param e mouse event to set the offsets.
         */
        const activateEffect = (e: MouseEvent) => {
            window.addEventListener('mouseup', deactivateDragging);
            offsetX = effectTarget.offsetLeft - e.clientX;
            offsetY = effectTarget.offsetTop  - e.clientY;
            window.addEventListener('mousemove', moveTarget);
        };

        /**
         * Clears events listeners when user stopped drabbing.
         */
        const deactivateDragging = () => {
            window.removeEventListener('mouseup', deactivateDragging);    
            window.removeEventListener('mousemove', moveTarget);
        };

        this.enable = () => {
            return void effectController.addEventListener('mousedown', activateEffect);
        };

        this.disable = () => {
            return void effectController.removeEventListener('mousedown', activateEffect);
        };
    }
}