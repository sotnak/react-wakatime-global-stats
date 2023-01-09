## WakaTime stats
### Waka component
main component
#### interface WakaProps
- aggregateFunction: AggregateFunction
- category: Category
- year: number //[ 2013, ...,2022 ]
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