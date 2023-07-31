export const iconSecondary = {
  beforeMount(element, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-green-400 text-xl`;

    if (binding.value.right) {
      iconClass += ' float-right';
    }

    element.innerHTML += `<i class="${iconClass}"></i>`;
  },
};

export default {
  beforeMount(element, binding) {
    let iconClass = `fa fa-${binding.value} text-xl`;

    if (binding.arg === 'full') {
      iconClass = binding.value;
    }

    if (binding.modifiers.right) {
      iconClass += ' float-right';
    }

    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400';
    } else {
      iconClass += ' text-green-400';
    }

    element.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
