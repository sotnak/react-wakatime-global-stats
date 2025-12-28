## WakaTime stats
WakaTime global stats (yearly) component library.
Uses data from year-end-reports, for example on the use of editors, languages and operating systems.
### Waka component
main component
#### interface WakaProps
- aggregateFunction: AggregateFunction
- category: Category
- year: number //[ 2013, ...,2024 ]
- limit: number | undefined

#### enum AggregateFunction
- sum = 0
- average = 1
- median = 2

#### enum Category
- languages = 0
- editors = 1
- operating_systems = 2

### WakaInteractive component
experimental (encapsulates Waka component)