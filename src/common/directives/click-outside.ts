import { DirectiveBinding } from 'vue'

interface HTMLElementClickOutside extends HTMLElement {
    clickOutsideEvent(event: Event): void;
}

export default {
    mounted(el: HTMLElementClickOutside, binding: DirectiveBinding) {
        el.clickOutsideEvent = function(event: Event) {
            if (!(el === event.target || el.contains(<Node>event.target))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: HTMLElementClickOutside) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};
