/*
 * (view-effect.type.ts) ViewEffect definition.
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

/**
 * Controller for the `View Effects`.
 */
export interface ViewEffect {
    /**
     * Applies `Effect` to the view.
     */
    readonly enable: VoidFunction;
    /**
     * Removes `Effect` from the view.
     */
    readonly disable: VoidFunction;
}

/**
 * Creates new `view effect` for effects,
 * applied to pointer (cursor/touchscreen) events.
 */
export interface PointerViewEffectConstructor {
     /**
     * @param effectTarget View, current effect is applied to.
     * 
     * @param effectController If provided, effect will be achived by interacting
     * with this {@link effectController} element, and not {@link effectTarget}.
     * 
     * For example, you can achive desktop app window behavior, when window
     * is moved around the screen only when its header is being dragged by the cursor,
     * By default equals to {@link effectTarget}.
     */
    new (effectTarget: HTMLElement, effectController?: HTMLElement): ViewEffect;
}