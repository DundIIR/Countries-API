export interface ICountryMini {
	name: {
		common: string
		official: string
	}
	population: number
	region: string
	capital: string[]
	flags: {
		alt: string
		png: string
		svg: string
	}
	translations: {
		rus: {
			official: string
			common: string
		}
	}
}

export interface ICountry {
	name: {
		common: string
		official: string
		nativeName: {
			[languageCode: string]: {
				common: string
				official: string
			}
		}
	}
	population: number
	region: string
	subregion: string
	capital: string[]
	flags: {
		alt: string
		png: string
		svg: string
	}
	coatOfArms: {
		png: string
		svg: string
	}
	tld: string[]
	currencies: {
		[nameCurrency: string]: {
			symbol: string
			name: string
		}
	}
	languages: {
		[language: string]: string
	}
	translations: {
		rus: {
			official: string
			common: string
		}
	}
	borders: string[]
}
