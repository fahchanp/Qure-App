import HospitalCard from "@/components/HospitalCard";
import HospitalStyles from "@/components/HospitalStyles";
import { HospitalItem } from "@/components/interface";
import getHospitals from "@/lib/getHospitals";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text, TextInput, TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const SM_SCREEN = 576;
const MD_SCREEN = 900;

export default function FindHospitalScreen() {
  const { width } = useWindowDimensions();
  const numColumns = width < SM_SCREEN ? 1 : width < MD_SCREEN ? 2 : 3;

  const [hospitals, setHospitals]   = useState<HospitalItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadHospitals("");
  }, []);

  const loadHospitals = (search?: string) => {
    setLoading(true);
    getHospitals({
      search,
      setHospitalData: (data: HospitalItem[]) => {
        setHospitals(data);
        setLoading(false);
      },
    });
  };

  const handleSearch = () => loadHospitals(searchText.trim());

  const handleClear = () => {
    setSearchText("");
    loadHospitals("");
  };

  return (
    <View style={HospitalStyles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>

        <View style={HospitalStyles.searchRow}>
          <TextInput
            style={HospitalStyles.searchInput}
            placeholder="Search a hospital name"
            placeholderTextColor="#94a3b8"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={HospitalStyles.searchButton} onPress={handleSearch}>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Search</Text>
          </TouchableOpacity>
          {searchText !== "" && (
            <TouchableOpacity
              style={[HospitalStyles.searchButton, { backgroundColor: "#94a3b8" }]}
              onPress={handleClear}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={HospitalStyles.sectionLabel}>
          {hospitals.length} Hospital{hospitals.length !== 1 ? "s" : ""} Found
        </Text>

        {loading && (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#AC3130" />
            <Text style={{ color: "#94a3b8", marginTop: 10 }}>Loading hospitals...</Text>
          </View>
        )}

        {!loading && hospitals.length === 0 && (
          <View style={HospitalStyles.emptyState}>
            <Text style={HospitalStyles.emptyText}>No hospitals found</Text>
            <Text style={HospitalStyles.emptySubText}>Try a different search term</Text>
          </View>
        )}

        {!loading && hospitals.length > 0 && (
          <FlatList
            data={hospitals}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <HospitalCard item={item} />}
            numColumns={numColumns}
            key={numColumns}
            contentContainerStyle={HospitalStyles.cardContainer}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
}