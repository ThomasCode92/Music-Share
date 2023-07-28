export default {
  beforeMount(element, binding) {
    let iconClass = `fa fa-${binding.value} float-right text-green-400 text-xl`;

    if (binding.arg === 'full') {
      iconClass = binding.value;
    }

    element.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
