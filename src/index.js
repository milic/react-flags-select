import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types'
import countries from './countries';

function ReactFlagsSelect(props) {
	const [openOptions, setOpenOptions] = useState(false);
	const [selected, setSelected] = useState();
	const [defaultCountry] = useState(countries[props.defaultCountry] && props.defaultCountry);
	const [countriesList, setCountriesList] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [filter, setFilter] = useState('');

	const selectedFlagRef = useRef(null);
	const flagOptionsRef = useRef(null);
	const filterTextRef = useRef(null);

	const setCountries = useCallback(() => {
		const fullCountries = Object.keys(countries);
		let selectCountries = props.countries && props.countries.filter(country => countries[country]);
		if (props.blackList && selectCountries) {
			selectCountries = fullCountries.filter(countryKey => {
				return selectCountries.filter(country => countryKey === country).length === 0;
			});
		}
		setCountriesList(selectCountries || fullCountries);
	}, [props.countries, props.blackList]);

	useEffect(() => {
		setCountries();
		if (!props.disabled) {
			window.addEventListener('click', closeOptions);
			return () => window.removeEventListener('click', closeOptions);
		}
	}, [setCountries, props.disabled]);

	useEffect(() => {
		if (selected && !countriesList.includes(selected)) {
			setSelected(null);
		}
	}, [countriesList, selected]);

	useEffect(() => {
		setCountries();
	}, [props.countries, props.blackList, setCountries]);

	const toggleOptions = useCallback(() => {
		if (!props.disabled) setOpenOptions(open => !open);
	}, [props.disabled]);

	const toggleOptionsWithKeyboard = evt => {
		evt.preventDefault();
		if (evt.keyCode === 13) {
			toggleOptions();
		} else if (evt.keyCode === 27) {
			if (!props.disabled) setOpenOptions(false);
		}
	};

	function closeOptions(event) {
		if (
			event.target !== selectedFlagRef.current &&
			event.target !== flagOptionsRef.current &&
			event.target !== filterTextRef.current
		) {
			setOpenOptions(false);
		}
	}

	const onSelect = countryCode => {
		setSelected(countryCode);
		setFilter('');
		props.onSelect && props.onSelect(countryCode);
	};

	const onSelectWithKeyboard = (evt, countryCode) => {
		evt.preventDefault();
		if (evt.keyCode === 13) {
			onSelect(countryCode);
			closeOptions(evt);
		} else if (evt.keyCode === 27) {
			toggleOptions();
		}
	};

	const updateSelected = countryCode => {
		let isValid = countries[countryCode];
		if (isValid) setSelected(countryCode);
	};

	const filterSearch = evt => {
		let filterValue = evt.target.value;
		let filtered =
			filterValue && countriesList.filter(key => {
				let label = props.customLabels[key] || countries[key];
				return label && label.match(new RegExp(filterValue, 'i'));
			});
		setFilter(filterValue);
		setFilteredCountries(filtered);
	};

	let isSelected = selected || defaultCountry;
	let selectedSize = props.selectedSize;
	let optionsSize = props.optionsSize;
	let alignClass = props.alignOptions.toLowerCase() === 'left' ? 'to--left' : '';

	return (
		<div className={`flag-select ${props.className ? props.className : ''}`}>
			<div
				ref={selectedFlagRef}
				style={{ fontSize: `${selectedSize}px` }}
				className={`selected--flag--option ${props.disabled ? 'no--focus' : ''}`}
				tabIndex="0"
				onClick={toggleOptions}
				onKeyUp={toggleOptionsWithKeyboard}
			>
				{isSelected ? (
					<span className="country-flag" style={{ width: `${selectedSize}px`, height: `${selectedSize}px` }}>
						<img src={`/flags/${isSelected.toLowerCase()}.svg`} alt={isSelected} />
						{props.showSelectedLabel && (
							<span className="country-label">{props.customLabels[isSelected] || countries[isSelected]}</span>
						)}
					</span>
				) : (
					<span className="country-label">{props.placeholder}</span>
				)}
				<span className={`arrow-down ${props.disabled ? 'hidden' : ''}`}>▾</span>
			</div>
			{openOptions && (
				<div
					ref={flagOptionsRef}
					style={{ fontSize: `${optionsSize}px` }}
					className={`flag-options ${alignClass}`}
				>
					{props.searchable && (
						<div className="filterBox">
							<input
								type="text"
								placeholder={props.searchPlaceholder}
								ref={filterTextRef}
								onChange={filterSearch}
							/>
						</div>
					)}
					{(filter ? filteredCountries : countriesList).map(countryCode => (
						<div
							className={`flag-option ${props.showOptionLabel ? 'has-label' : ''}`}
							key={countryCode}
							tabIndex="0"
							onClick={() => onSelect(countryCode)}
							onKeyUp={evt => onSelectWithKeyboard(evt, countryCode)}
						>
							<span className="country-flag" style={{ width: `${optionsSize}px`, height: `${optionsSize}px` }}>
								<img src={`/flags/${countryCode.toLowerCase()}.svg`} alt="Country flag" />
								{props.showOptionLabel && (
									<span className="country-label">{props.customLabels[countryCode] || countries[countryCode]}</span>
								)}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

ReactFlagsSelect.defaultProps = {
	selectedSize: 16,
	optionsSize: 14,
	placeholder: 'Select a country',
	showSelectedLabel: true,
	showOptionLabel: true,
	alignOptions: 'right',
	customLabels: {},
	disabled: false,
	blackList: false,
	searchable: false,
	searchPlaceholder: 'Search',
};

ReactFlagsSelect.propTypes = {
	countries: PropTypes.array,
	blackList: PropTypes.bool,
	customLabels: PropTypes.object,
	selectedSize: PropTypes.number,
	optionsSize: PropTypes.number,
	defaultCountry: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	showSelectedLabel: PropTypes.bool,
	showOptionLabel: PropTypes.bool,
	alignOptions: PropTypes.string,
	onSelect: PropTypes.func,
	disabled: PropTypes.bool,
	searchable: PropTypes.bool,
	searchPlaceholder: PropTypes.string,
};

export default ReactFlagsSelect;
