import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: 20,
  },
  logo: {
    width: 36,
    height: 36,
    backgroundColor: '#00FF87',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tagline: {
    fontSize: 11,
    color: '#666666',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 24,
  },
  goalBadge: {
    backgroundColor: '#00FF8720',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  goalText: {
    fontSize: 12,
    color: '#00FF87',
    fontWeight: 'bold',
  },
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  macroCard: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 20,
    width: '48%',
  },
  macroCardHighlight: {
    borderWidth: 1,
    borderColor: '#00FF8730',
  },
  macroLabel: {
    fontSize: 10,
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00FF87',
  },
  macroUnit: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    marginTop: 24,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 11,
    color: '#00FF87',
    marginRight: 8,
  },
  tipText: {
    fontSize: 11,
    color: '#cccccc',
    flex: 1,
    lineHeight: 1.6,
  },
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottom: '1px solid #1a1a1a',
  },
  mealLabel: {
    fontSize: 12,
    color: '#cccccc',
    textTransform: 'capitalize',
  },
  mealCals: {
    fontSize: 12,
    color: '#00FF87',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    paddingTop: 16,
    borderTop: '1px solid #1a1a1a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#444444',
  },
})

interface MacroReportPdfProps {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  goal: string
  firstName?: string
}

const GOAL_LABELS: Record<string, string> = {
  FAT_LOSS: 'Fat Loss',
  MAINTENANCE: 'Maintenance',
  MUSCLE_GAIN: 'Muscle Gain',
}

export function MacroReportPdf({ calories, protein, carbs, fat, fiber, goal, firstName }: MacroReportPdfProps) {
  const goalLabel = GOAL_LABELS[goal] ?? goal
  const mealSplit = {
    breakfast: Math.round(calories * 0.25),
    lunch: Math.round(calories * 0.35),
    dinner: Math.round(calories * 0.30),
    snacks: Math.round(calories * 0.10),
  }
  const proteinCal = protein * 4
  const carbsCal = carbs * 4
  const fatCal = fat * 9
  const total = proteinCal + carbsCal + fatCal
  const proteinPct = Math.round((proteinCal / total) * 100)
  const carbsPct = Math.round((carbsCal / total) * 100)
  const fatPct = Math.round((fatCal / total) * 100)

  const tips = [
    'Prioritize protein at every meal to hit your daily target.',
    'Drink at least 2–3L of water daily to support metabolism.',
    'Eat fiber-rich foods like vegetables, legumes, and whole grains.',
    'Space meals every 3–4 hours to maintain stable energy levels.',
    'Track your food with an app like MyFitnessPal for accuracy.',
    'Allow a ±10% variance in your daily macros — consistency matters more than perfection.',
  ]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <View>
            <Text style={styles.appName}>MacroCalc AI</Text>
            <Text style={styles.tagline}>Calculate. Plan. Transform.</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>
          {firstName ? `${firstName}'s` : 'Your'} Daily Macro Report
        </Text>
        <Text style={styles.subtitle}>
          Personalized nutrition targets based on your body stats and goals
        </Text>

        <View style={styles.goalBadge}>
          <Text style={styles.goalText}>Goal: {goalLabel}</Text>
        </View>

        {/* Macro cards */}
        <View style={styles.macroGrid}>
          {[
            { label: 'Daily Calories', value: calories, unit: 'kcal', highlight: true },
            { label: 'Protein', value: protein, unit: `g (${proteinPct}%)` },
            { label: 'Carbohydrates', value: carbs, unit: `g (${carbsPct}%)` },
            { label: 'Fats', value: fat, unit: `g (${fatPct}%)` },
            { label: 'Fiber', value: fiber, unit: 'g' },
          ].map((m) => (
            <View key={m.label} style={[styles.macroCard, m.highlight ? styles.macroCardHighlight : {}]}>
              <Text style={styles.macroLabel}>{m.label}</Text>
              <Text style={styles.macroValue}>{m.value}</Text>
              <Text style={styles.macroUnit}>{m.unit}</Text>
            </View>
          ))}
        </View>

        {/* Meal split */}
        <Text style={styles.sectionHeader}>Suggested Meal Split</Text>
        {Object.entries(mealSplit).map(([meal, cals]) => (
          <View key={meal} style={styles.mealRow}>
            <Text style={styles.mealLabel}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
            <Text style={styles.mealCals}>{cals} kcal</Text>
          </View>
        ))}

        {/* Tips */}
        <Text style={styles.sectionHeader}>Nutrition Tips</Text>
        {tips.map((tip, i) => (
          <View key={i} style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by MacroCalc AI · macrocalc.ai</Text>
          <Text style={styles.footerText}>Not medical advice. Consult a professional before major dietary changes.</Text>
        </View>
      </Page>
    </Document>
  )
}
