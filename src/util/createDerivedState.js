export default (selectors, state) =>
	Object.entries(selectors).reduce(
		(acc, [name, fn]) => ({
			...acc,
			get [name]() {
				return selectors[name](state);
			}
		}),
		{}
	);
